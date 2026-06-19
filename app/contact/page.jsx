import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Contact() {
  let settings = await prisma.settings.findFirst();
  if (!settings) {
    settings = {
      address: "123 Rue de la Seremoni, Port-au-Prince, Haiti",
      phone1: "+509 3000-0000",
      whatsapp: "50940000000",
      email: "info@c-remonie.com"
    };
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>Kontakte Nou</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
            Nou la pou reponn tout kesyon w yo.
          </p>
        </div>
      </div>
      
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Adrès</h3>
              <p style={{ color: 'var(--color-text-light)' }}>{settings.address}</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📞</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Telefòn</h3>
              <p style={{ color: 'var(--color-text-light)' }}>{settings.phone1}<br/>{settings.phone2}</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{ marginBottom: '0.5rem' }}>WhatsApp</h3>
              <a href="/api/whatsapp-redirect" target="_blank" className="btn btn-outline" style={{ borderColor: '#25D366', color: '#25D366', padding: '0.5rem 1rem' }}>Ekri nou</a>
            </div>
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: 'var(--border-radius-md)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
              <p style={{ color: 'var(--color-text-light)' }}>{settings.email}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
