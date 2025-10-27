import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store';

export default function App() {
  const location = useLocation();
  const cartCount = useStore(s => s.cart.length);

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1f2937',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    marginRight: 'auto',
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  };

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#10b981' : 'white',
    textDecoration: 'none',
    paddingBottom: '0.25rem',
    borderBottom: location.pathname === path ? '2px solid white' : '2px solid transparent',
    transition: 'all 0.2s ease',
    fontWeight: location.pathname === path ? '600' : '500',
    fontSize: '0.95rem',
  });

  const cartBadgeStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  };

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          🧸 Contoso Toyland
        </Link>
        <div style={linkContainerStyle}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/admin" style={getLinkStyle('/admin')}>Admin</Link>
          <Link to="/cart" style={getLinkStyle('/cart')}>
            Cart {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
          </Link>
        </div>
      </nav>
      <main style={containerStyle}>
        {/* Routes will be rendered by Router */}
      </main>
    </>
  );
}
