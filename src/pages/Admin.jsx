import React, { useState } from 'react';
import { useStore } from '../store';

/**
 * Validates form fields for toy creation
 * @param {Object} formData - Form data containing name, price, and image URL
 * @returns {Object} Object with validation errors, empty if valid
 */
function validateForm(formData) {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (formData.name.length > 50) {
    errors.name = 'Name must be at most 50 characters';
  }
  
  if (!formData.price) {
    errors.price = 'Price is required';
  } else if (formData.price < 0.01) {
    errors.price = 'Price must be at least $0.01';
  } else if (formData.price > 999.99) {
    errors.price = 'Price must be less than $1000';
  }
  
  if (!formData.image) {
    errors.image = 'Image URL is required';
  } else if (!/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(formData.image)) {
    errors.image = 'Enter a valid image URL (png, jpg, jpeg, gif, or webp)';
  }
  
  return errors;
}

export default function Admin() {
  const addToy = useStore(s => s.addToy);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'toyland123';

  /**
   * Handles login form submission
   * @param {Event} e - Form submission event
   */
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      e.target.reset();
    } else {
      setLoginError('Invalid credentials');
    }
  };

  /**
   * Handles form field changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  /**
   * Handles form submission for adding a new toy
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const newToy = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
    };
    
    addToy(newToy);
    setFormData({ name: '', price: '', image: '' });
    setFormErrors({});
    setSuccessMessage('Toy added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  /**
   * Handles admin logout
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    setFormData({ name: '', price: '', image: '' });
    setFormErrors({});
    setSuccessMessage('');
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '1.5rem',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
  };

  const formGroupStyle = {
    marginBottom: '1.25rem',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.75rem',
    border: hasError ? '2px solid #dc2626' : '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
  });

  const errorStyle = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '0.5rem',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#16a34a',
    color: '#ffffff',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
  };

  const errorMessageStyle = {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.95rem',
  };

  const successMessageStyle = {
    backgroundColor: '#dcfce7',
    border: '1px solid #86efac',
    color: '#16a34a',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.95rem',
  };

  if (!isAuthenticated) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Admin Login</h1>
          {loginError && <div style={errorMessageStyle}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div style={formGroupStyle}>
              <label htmlFor="username" style={labelStyle}>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                style={inputStyle(false)}
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                style={inputStyle(false)}
                required
              />
            </div>
            <button
              type="submit"
              style={primaryButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Add New Toy</h1>
        {successMessage && <div style={successMessageStyle}>{successMessage}</div>}
        <button
          onClick={handleLogout}
          style={secondaryButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
        >
          Logout
        </button>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Toy Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter toy name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle(!!formErrors.name)}
            />
            {formErrors.name && <div style={errorStyle}>{formErrors.name}</div>}
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="price" style={labelStyle}>Price ($)</label>
            <input
              id="price"
              type="number"
              name="price"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle(!!formErrors.price)}
            />
            {formErrors.price && <div style={errorStyle}>{formErrors.price}</div>}
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="image" style={labelStyle}>Image URL</label>
            <input
              id="image"
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              style={inputStyle(!!formErrors.image)}
            />
            {formErrors.image && <div style={errorStyle}>{formErrors.image}</div>}
          </div>
          <button
            type="submit"
            style={primaryButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            Add Toy
          </button>
        </form>
      </div>
    </div>
  );
}
