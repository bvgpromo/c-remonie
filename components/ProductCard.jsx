'use client';

export default function ProductCard({ product }) {
  const handleWhatsApp = () => {
    const message = `Bonjou, mwen ta renmen konnen plis sou pwodwi sa a: ${product.name} - ${product.price} HTG.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`/api/whatsapp-redirect?text=${encodedMessage}`, '_blank');
  };

  return (
    <div style={{
      border: '1px solid #eaeaea',
      borderRadius: 'var(--border-radius-md)',
      overflow: 'hidden',
      backgroundColor: 'var(--color-background)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform var(--transition-fast)',
      display: 'flex',
      flexDirection: 'column'
    }} className="product-card">
      <div style={{ position: 'relative', height: '250px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: '#ccc' }}>Pa gen foto</span>
        )}
        {product.type && (
          <span style={{
            position: 'absolute', top: '10px', right: '10px',
            backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)',
            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
          }}>
            {product.type}
          </span>
        )}
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{product.name}</h3>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
          {product.price} HTG
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
          {product.sizes && <span>Gwosè: {product.sizes}</span>}
          {product.colors && <span>| Koulè: {product.colors}</span>}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn btn-primary" style={{ padding: '0.6rem', fontSize: '0.9rem' }}>
            Mete nan panyen
          </button>
          <button onClick={handleWhatsApp} className="btn btn-outline" style={{ padding: '0.6rem', fontSize: '0.9rem', borderColor: '#25D366', color: '#25D366' }}>
            Kontakte sou WhatsApp
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
