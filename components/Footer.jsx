import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Footer() {
  let settings = await prisma.settings.findFirst();
  if (!settings) {
    settings = {
      address: "123 Rue de la Seremoni, Port-au-Prince, Haiti",
      phone1: "+509 3000-0000",
      email: "info@c-remonie.com"
    };
  }

  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-lg) 0 var(--spacing-md)', borderTop: '1px solid #eaeaea', marginTop: 'var(--spacing-xl)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '1rem' }}>C-remonie</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem' }}>
            Nou la pou ofri w pi bèl rad maryaj, kostim, ak tòj pou tout kalite seremoni w yo. Lwe oswa Achte avèk nou!
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem' }}>Lyen Rapide</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link href="/boutique">Boutique</Link></li>
            <li><Link href="/location-rad-maryaj">Rad Maryaj</Link></li>
            <li><Link href="/kostim">Kostim</Link></li>
            <li><Link href="/soulye">Soulye</Link></li>
          </ul>
        </div>

        <div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Kontak</h3>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
              📍 {settings.address}
            </p>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
              📞 {settings.phone1} {settings.phone2 && `/ ${settings.phone2}`}
            </p>
            <p style={{ color: 'var(--color-text-light)' }}>
              ✉️ {settings.email}
            </p>
          </div>
        </div>

      </div>
      
      <div className="container" style={{ textAlign: 'center', color: 'var(--color-text-light)', borderTop: '1px solid #ddd', paddingTop: '1rem', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} C-remonie. Tout dwa rezève.</p>
      </div>
    </footer>
  );
}
