'use client';
import Link from 'next/link';
import { useState } from 'react';
import Cart from './Cart';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="navbar" style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderBottom: '1px solid #eaeaea', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
            C-remonie
          </Link>

          {/* Desktop Menu */}
          <div className="nav-links" style={{ display: 'flex', gap: '0.5rem', display: 'none', alignItems: 'center' }}>
            <Link href="/boutique" className="nav-item">Boutique</Link>
            <Link href="/location-rad-maryaj" className="nav-item">Rad Maryaj</Link>
            <Link href="/kostim" className="nav-item">Kostim</Link>
            <Link href="/soulye" className="nav-item">Soulye</Link>
            <Link href="/toj" className="nav-item">Tòj</Link>
            <div className="dropdown">
              <span className="nav-item" style={{ cursor: 'pointer', gap: '0.2rem' }}>Lòt atik ▾</span>
              <div className="dropdown-content">
                <Link href="/jeans">Jeans</Link>
                <Link href="/mayo">Mayo</Link>
                <Link href="/souvetman">Souvètman</Link>
                <Link href="/bijou">Bijou</Link>
                <Link href="/cheve">Cheve</Link>
              </div>
            </div>
            <Link href="/contact" className="nav-item">Kontak</Link>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => setIsCartOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', position: 'relative' }}
            >
              🛒
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                0
              </span>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', display: 'block' }}
              className="mobile-menu-btn"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-surface)' }}>
            <Link href="/boutique" onClick={() => setIsMenuOpen(false)}>Boutique</Link>
            <Link href="/location-rad-maryaj" onClick={() => setIsMenuOpen(false)}>Rad Maryaj</Link>
            <Link href="/kostim" onClick={() => setIsMenuOpen(false)}>Kostim</Link>
            <Link href="/soulye" onClick={() => setIsMenuOpen(false)}>Soulye</Link>
            <Link href="/toj" onClick={() => setIsMenuOpen(false)}>Tòj</Link>
            
            <div style={{ fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--color-primary-dark)' }}>Lòt atik:</div>
            <Link href="/jeans" onClick={() => setIsMenuOpen(false)} style={{ paddingLeft: '1rem' }}>- Jeans</Link>
            <Link href="/mayo" onClick={() => setIsMenuOpen(false)} style={{ paddingLeft: '1rem' }}>- Mayo</Link>
            <Link href="/souvetman" onClick={() => setIsMenuOpen(false)} style={{ paddingLeft: '1rem' }}>- Souvètman</Link>
            <Link href="/bijou" onClick={() => setIsMenuOpen(false)} style={{ paddingLeft: '1rem' }}>- Bijou</Link>
            <Link href="/cheve" onClick={() => setIsMenuOpen(false)} style={{ paddingLeft: '1rem' }}>- Cheve</Link>
            
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
          </div>
        )}
      </nav>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}

      <style jsx>{`
        .nav-item {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          transition: all var(--transition-fast);
          font-weight: 500;
          color: var(--color-text);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .nav-item:hover {
          background-color: var(--color-primary);
          color: var(--color-background);
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
          transform: translateY(-2px);
        }
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: var(--color-surface);
          min-width: 160px;
          box-shadow: var(--shadow-md);
          border-radius: var(--border-radius-sm);
          z-index: 1;
          top: 100%;
          left: 0;
          flex-direction: column;
        }
        .dropdown-content a {
          color: var(--color-text);
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
        .dropdown-content a:hover {
          background-color: var(--color-background);
          color: var(--color-primary);
        }
        .dropdown:hover .dropdown-content {
          display: flex;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
