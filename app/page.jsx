import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Fetch featured products from the database
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 8,
  });

  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <section style={{ 
        position: 'relative', 
        height: '80vh', 
        minHeight: '600px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/wedding-banner.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div className="container animate-fade-in" style={{ zIndex: 1 }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>C-remonie</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto', fontFamily: 'var(--font-sans)', fontWeight: '300', lineHeight: '1.8' }}>
            Dekouvri pi bèl rad maryaj, kostim, ak tòj <br /> pou tout gwo evènman nan lavi w.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/location-rad-maryaj" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Lwe Kounye a
            </Link>
            <Link href="/boutique" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderColor: '#fff', color: '#fff' }}>
              Achte Kounye a
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section bg-surface">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>Meyè Chwa Nou Yo</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
          </div>

          {featuredProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: 'var(--color-text-light)', fontStyle: 'italic' }}>
              Pa gen pwodwi espesyal kounye a. Vizite Admin Dashboard pou w ajoute pwodwi.
            </p>
          )}
          
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/boutique" className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
              Wè tout Pwodwi yo
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Highlights */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <Link href="/location-rad-maryaj" style={{ display: 'block', backgroundColor: '#f9f9f9', padding: '2rem', textAlign: 'center', borderRadius: 'var(--border-radius-md)', transition: 'transform var(--transition-fast)' }} className="hover-lift">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Rad Maryaj</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Lwe oswa achte bèl rad maryaj pou jounen espesyal ou.</p>
          </Link>

          <Link href="/kostim" style={{ display: 'block', backgroundColor: '#f9f9f9', padding: '2rem', textAlign: 'center', borderRadius: 'var(--border-radius-md)', transition: 'transform var(--transition-fast)' }} className="hover-lift">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Kostim</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Kostim gason klas pou tout kalite seremoni.</p>
          </Link>

          <Link href="/soulye" style={{ display: 'block', backgroundColor: '#f9f9f9', padding: '2rem', textAlign: 'center', borderRadius: 'var(--border-radius-md)', transition: 'transform var(--transition-fast)' }} className="hover-lift">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Soulye</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Soulye elegant pou konplete style ou.</p>
          </Link>

          <Link href="/toj" style={{ display: 'block', backgroundColor: '#f9f9f9', padding: '2rem', textAlign: 'center', borderRadius: 'var(--border-radius-md)', transition: 'transform var(--transition-fast)' }} className="hover-lift">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tòj</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Tòj pou gradyasyon. Disponib pou lwe ak achte.</p>
          </Link>

        </div>
      </section>

      <Footer />
    </>
  );
}
