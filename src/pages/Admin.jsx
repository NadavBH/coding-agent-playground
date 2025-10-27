import React, { useState } from 'react';
import { useStore } from '../store';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [formErrors, setFormErrors] = useState({});
  const addToy = useStore(s => s.addToy);

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'toyland123';

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      alert('Logged in successfully!');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (formData.name.length > 50) {
      errors.name = 'Name must be at most 50 characters';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    if (parseFloat(formData.price) > 1000) {
      errors.price = 'Price must be less than $1000';
    }
    
    if (!formData.image) {
      errors.image = 'Image URL is required';
    } else if (!/^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)$/i.test(formData.image)) {
      errors.image = 'Enter a valid image URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddToy = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    addToy({
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      id: Date.now().toString(),
    });

    alert(`"${formData.name}" added to store!`);
    setFormData({ name: '', price: '', image: '' });
    setFormErrors({});
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setFormData({ name: '', price: '', image: '' });
    setFormErrors({});
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '2.5rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    backgroundColor: 'white',
  };

  const inputStyle = (hasError = false) => ({
    width: '100%',
    padding: '0.85rem',
    border: `2px solid ${hasError ? '#fca5a5' : '#e5e7eb'}`,
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
    outline: 'none',
    backgroundColor: hasError ? '#fef2f2' : '#ffffff',
    color: '#1f2937',
  });

  const submitButtonStyle = {
    width: '100%',
    padding: '0.85rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  if (!isAuthenticated) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '2rem',
            fontSize: '2rem',
            color: '#1f2937',
            fontWeight: '700',
          }}>🔐 Admin Login</h2>

          {loginError && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '6px',
              marginBottom: '1rem',
              border: '1px solid #fca5a5',
              fontWeight: '500',
              fontSize: '0.95rem',
            }}>
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1f2937' }}>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                style={inputStyle()}
                required
              />
              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>Demo: admin</div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1f2937' }}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                style={inputStyle()}
                required
              />
              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>Demo: toyland123</div>
            </div>

            <button
              type="submit"
              style={submitButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🔓 Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '2px solid #e5e7eb',
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', color: '#1f2937', fontWeight: '700' }}>🎮 Toy Management</h2>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                marginRight: '0.5rem',
              }} />
              Admin authenticated
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            🚪 Sign Out
          </button>
        </div>

        <form onSubmit={handleAddToy}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: '#1f2937', fontWeight: '700' }}>➕ Add New Toy</h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>Toy Name</label>
            <input
              type="text"
              placeholder="Enter toy name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
              }}
              style={inputStyle(!!formErrors.name)}
            />
            {formErrors.name && <div style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>{formErrors.name}</div>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: e.target.value });
                if (formErrors.price) setFormErrors({ ...formErrors, price: '' });
              }}
              style={inputStyle(!!formErrors.price)}
            />
            {formErrors.price && <div style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>{formErrors.price}</div>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                if (formErrors.image) setFormErrors({ ...formErrors, image: '' });
              }}
              style={inputStyle(!!formErrors.image)}
            />
            {formErrors.image && <div style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>{formErrors.image}</div>}
          </div>

          <button
            type="submit"
            style={submitButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ✓ Add Toy to Store
          </button>
        </form>
      </div>
    </div>
  );
}
