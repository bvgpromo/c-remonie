import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Kostim() {
  const products = await prisma.product.findMany({
    where: { category: 'Suit' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>Kostim</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
            Kostim gason klas pou maryaj ak reyinyon.
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
              Pa gen kostim disponib kounye a.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
