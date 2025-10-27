
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useStore } from './store';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();
  const cart = useStore(s => s.cart);

  const navStyle = {
    backgroundColor: '#1f2937',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  };

  const navContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  const linksStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: '#ffffff',
    position: 'relative',
    paddingBottom: '0.5rem',
    borderBottom: location.pathname === path ? '3px solid #16a34a' : 'none',
    transition: 'all 0.3s ease',
  });

  const cartBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderRadius: '50%',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <Link to="/" style={logoStyle}>
            <img src="/contosologo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
            <span>Contoso Toyland</span>
          </Link>
          <ul style={linksStyle}>
            <li>
              <Link to="/" style={linkStyle('/')}>Home</Link>
            </li>
            <li>
              <Link to="/cart" style={linkStyle('/cart')}>
                Cart
                {cart.length > 0 && <span style={cartBadgeStyle}>{cart.length}</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
