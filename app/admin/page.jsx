'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('Sell');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [isFeatured, setIsFeatured] = useState(false);

  // Settings State
  const [settingsAddress, setSettingsAddress] = useState('');
  const [settingsPhone1, setSettingsPhone1] = useState('');
  const [settingsPhone2, setSettingsPhone2] = useState('');
  const [settingsWhatsapp, setSettingsWhatsapp] = useState('');
  const [settingsEmail, setSettingsEmail] = useState('');

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchSettings = async () => {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data) {
      setSettingsAddress(data.address || '');
      setSettingsPhone1(data.phone1 || '');
      setSettingsPhone2(data.phone2 || '');
      setSettingsWhatsapp(data.whatsapp || '');
      setSettingsEmail(data.email || '');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchSettings();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for now
      setIsAuthenticated(true);
    } else {
      alert('Modpas pa bon!');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, imageUrl, type, sizes, colors, category, isFeatured })
    });
    
    if (res.ok) {
      alert('Pwodwi a ajoute!');
      setName(''); setPrice(''); setImageUrl(''); setSizes(''); setColors(''); setIsFeatured(false);
      fetchProducts();
    } else {
      alert('Erè lè nap ajoute pwodwi a.');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: settingsAddress,
        phone1: settingsPhone1,
        phone2: settingsPhone2,
        whatsapp: settingsWhatsapp,
        email: settingsEmail
      })
    });
    
    if (res.ok) {
      alert('Enfòmasyon kontak yo sove avèk siksè!');
    } else {
      alert('Erè lè nap sove kontak la.');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Ou sèten ou vle efase pwodwi sa?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)' }}>
        <form onSubmit={handleLogin} style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Admin Login</h2>
          <input 
            type="password" 
            placeholder="Modpas..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.8rem', width: '100%', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Konekte</button>
          <Link href="/" style={{ display: 'block', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>← Retounen nan sit la</Link>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1000px', backgroundColor: '#fff', padding: '2rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
          <h1 style={{ color: 'var(--color-primary)' }}>Dashboard Admin</h1>
          <Link href="/" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Gade Sit la</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Add Product Form */}
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-sm)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Ajoute yon Pwodwi</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Non pwodwi" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '0.5rem' }} />
              <input type="number" placeholder="Pri (HTG)" value={price} onChange={e => setPrice(e.target.value)} required style={{ padding: '0.5rem' }} />
              <input type="text" placeholder="URL Foto a" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ padding: '0.5rem' }} />
              
              <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '0.5rem' }}>
                <option value="Sell">Pou Achte (Sell)</option>
                <option value="Rent">Pou Lwe (Rent)</option>
                <option value="Both">Tou 2</option>
              </select>

              <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '0.5rem' }}>
                <option value="Wedding">Rad Maryaj</option>
                <option value="Suit">Kostim</option>
                <option value="Shoes">Soulye</option>
                <option value="Gown">Tòj</option>
                <option value="Thrift">Pèpè</option>
                <option value="New">Nèf</option>
                <option value="Jeans">Jeans</option>
                <option value="Mayo">Mayo</option>
                <option value="Underwear">Souvètman</option>
                <option value="Jewelry">Bijou</option>
                <option value="Hair">Chev</option>
              </select>

              <input type="text" placeholder="Gwosè (S, M, L...)" value={sizes} onChange={e => setSizes(e.target.value)} style={{ padding: '0.5rem' }} />
              <input type="text" placeholder="Koulè (Nwa, Blan...)" value={colors} onChange={e => setColors(e.target.value)} style={{ padding: '0.5rem' }} />
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                Mete l an Vedette (Homepage)
              </label>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Ajoute Pwodwi a</button>
            </form>
          </div>

          {/* Product List */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Lis Pwodwi yo ({products.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {p.imageUrl ? <img src={p.imageUrl} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /> : <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc' }}></div>}
                    <div>
                      <h4 style={{ margin: 0 }}>{p.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                        {p.price} HTG | {p.category} {p.isFeatured && '⭐ Vedette'}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="btn" style={{ backgroundColor: '#ff4444', color: '#fff', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Efase</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div style={{ marginTop: '2rem', backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--border-radius-sm)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Konfigirasyon Kontak</h3>
          <form onSubmit={handleSaveSettings} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Adrès</label>
              <input type="text" value={settingsAddress} onChange={e => setSettingsAddress(e.target.value)} style={{ padding: '0.5rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Telefòn 1</label>
              <input type="text" value={settingsPhone1} onChange={e => setSettingsPhone1(e.target.value)} style={{ padding: '0.5rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Telefòn 2</label>
              <input type="text" value={settingsPhone2} onChange={e => setSettingsPhone2(e.target.value)} style={{ padding: '0.5rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>WhatsApp (Sèlman Chif, e.g. 50940000000)</label>
              <input type="text" value={settingsWhatsapp} onChange={e => setSettingsWhatsapp(e.target.value)} style={{ padding: '0.5rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Email</label>
              <input type="email" value={settingsEmail} onChange={e => setSettingsEmail(e.target.value)} style={{ padding: '0.5rem' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1rem', width: '100%' }}>Sove Chanjman yo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
