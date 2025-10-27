import React, { useState } from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

export default function Cart() {
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (index, value) => {
    const newQuantities = { ...quantities };
    newQuantities[index] = Math.max(1, Math.min(10, parseInt(value) || 1));
    setQuantities(newQuantities);
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
    const newQuantities = { ...quantities };
    delete newQuantities[index];
    setQuantities(newQuantities);
  };

  const totalAmount = cart.reduce((total, item, idx) => total + (item.price * (quantities[idx] || 1)), 0);

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '1.5rem',
  };

  const titleStyle = {
    fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
    marginBottom: '2rem',
    color: '#1f2937',
  };

  const emptyStyle = {
    textAlign: 'center',
    padding: '3rem 1rem',
  };

  const emptyMessageStyle = {
    color: '#6b7280',
    fontSize: '1.125rem',
    marginBottom: '1rem',
  };

  const cartItemStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto',
    gap: '1.5rem',
    alignItems: 'center',
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundColor: '#ffffff',
  };

  const itemImageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '6px',
    backgroundColor: '#f3f4f6',
  };

  const itemDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const itemNameStyle = {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
    wordBreak: 'break-word',
  };

  const itemPriceStyle = {
    color: '#6b7280',
    fontSize: '0.95rem',
  };

  const quantityControlStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const quantityButtonStyle = {
    padding: '0.25rem 0.5rem',
    backgroundColor: '#e5e7eb',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  };

  const quantityInputStyle = {
    width: '50px',
    padding: '0.25rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '0.875rem',
  };

  const removeButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  };

  const summaryStyle = {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    marginTop: '2rem',
  };

  const totalStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
    textAlign: 'right',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    flex: '1',
    minWidth: '150px',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#16a34a',
    color: '#ffffff',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (cart.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Shopping Cart</h1>
        <div style={emptyStyle}>
          <p style={emptyMessageStyle}>Your cart is empty</p>
          <Link
            to="/"
            style={{
              ...secondaryButtonStyle,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Shopping Cart</h1>
      <div>
        {cart.map((item, idx) => (
          <div key={idx} style={cartItemStyle}>
            <img src={item.image} alt={item.name} style={itemImageStyle} />
            <div style={itemDetailsStyle}>
              <div style={itemNameStyle}>{item.name}</div>
              <div style={itemPriceStyle}>${item.price.toFixed(2)}</div>
            </div>
            <div style={quantityControlStyle}>
              <button
                style={quantityButtonStyle}
                onClick={() => handleQuantityChange(idx, (quantities[idx] || 1) - 1)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantities[idx] || 1}
                onChange={(e) => handleQuantityChange(idx, e.target.value)}
                style={quantityInputStyle}
              />
              <button
                style={quantityButtonStyle}
                onClick={() => handleQuantityChange(idx, (quantities[idx] || 1) + 1)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              >
                +
              </button>
            </div>
            <button
              style={removeButtonStyle}
              onClick={() => handleRemoveItem(idx)}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div style={summaryStyle}>
        <div style={totalStyle}>Total: ${totalAmount.toFixed(2)}</div>
        <div style={buttonContainerStyle}>
          <button
            style={primaryButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            Proceed to Payment
          </button>
          <Link
            to="/"
            style={secondaryButtonStyle}
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
