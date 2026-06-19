'use client';

export default function Cart({ onClose }) {
  // Placeholder cart items
  const cartItems = [];

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
      backgroundColor: 'var(--color-background)', zIndex: 1000, boxShadow: 'var(--shadow-lg)',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>Panyen Ou</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginTop: '2rem' }}>Panyen w lan vid kounye a.</p>
        ) : (
          <div>
            {/* List items here */}
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid #eaeaea', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>0.00 HTG</span>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }}>
          Peye ak MonCash (Bientôt)
        </button>
      </div>
    </div>
  );
}
