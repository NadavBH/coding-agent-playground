import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';

export default function Product() {
  const { id } = useParams();
  const getToyById = useStore(s => s.getToyById);
  const addToCart = useStore(s => s.addToCart);
  const toy = getToyById(id);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!toy) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Product not found</h2>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(toy);
      }
      setLoading(false);
      setQuantity(1);
    }, 300);
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  };

  const imageContainerStyle = {
    flex: '1 1 40%',
    minWidth: '250px',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f3f4f6',
  };

  const detailsStyle = {
    flex: '1 1 40%',
    minWidth: '250px',
    paddingTop: '1rem',
  };

  const titleStyle = {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
    wordBreak: 'break-word',
  };

  const priceStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: '1.5rem',
  };

  const sectionTitleStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  };

  const infoBoxStyle = {
    backgroundColor: '#dbeafe',
    border: '1px solid #93c5fd',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    color: '#1f2937',
  };

  const quantityContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  };

  const quantityButtonStyle = {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#e5e7eb',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  const quantityInputStyle = {
    width: '60px',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '1rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const addToCartButtonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' : 'auto',
  };

  const linkStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src={toy.image} alt={toy.name} style={imageStyle} />
      </div>
      <div style={detailsStyle}>
        <h1 style={titleStyle}>{toy.name}</h1>
        <p style={priceStyle}>${toy.price.toFixed(2)}</p>

        <div style={infoBoxStyle}>
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            <strong>✓ Free Shipping</strong> on all orders over $50<br />
            <strong>✓ 30-Day Guarantee</strong> - Return for a full refund<br />
            <strong>✓ Safe & Secure</strong> - SSL encrypted checkout
          </p>
        </div>

        <div style={quantityContainerStyle}>
          <label htmlFor="quantity" style={sectionTitleStyle}>Quantity:</label>
          <button
            style={quantityButtonStyle}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            style={quantityInputStyle}
          />
          <button
            style={quantityButtonStyle}
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          >
            +
          </button>
        </div>

        <div style={buttonContainerStyle}>
          <button
            onClick={handleAddToCart}
            style={addToCartButtonStyle}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = '#15803d';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#16a34a';
            }}
          >
            {loading ? 'Adding...' : `Add ${quantity > 1 ? quantity + ' ' : ''}to Cart`}
          </button>
          <Link
            to="/"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
