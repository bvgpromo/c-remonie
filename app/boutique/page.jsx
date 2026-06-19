import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

// Enable dynamic rendering for this page to always fetch fresh products
export const dynamic = 'force-dynamic';

export default async function Boutique() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Navbar />
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>Boutique</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
            Gade tout bèl pwodwi nou yo la.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: 'var(--color-text-light)', fontStyle: 'italic', padding: '4rem 0' }}>
              Pa gen pwodwi nan boutik la kounye a.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
