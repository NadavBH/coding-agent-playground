import React from 'react';
import { useStore } from '../store';

export default function Cart() {
  const [quantities, setQuantities] = React.useState({});
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);

  React.useEffect(() => {
    const newQuantities = {};
    cart.forEach((item, idx) => {
      if (newQuantities[idx] === undefined) {
        newQuantities[idx] = 1;
      }
    });
    setQuantities(newQuantities);
  }, [cart]);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (idx, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      setQuantities({ ...quantities, [idx]: newQuantity });
    }
  };

  const totalAmount = cart.reduce((total, item, idx) => total + (item.price * (quantities[idx] || 1)), 0);

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  };

  const titleStyle = {
    margin: '0 0 0.5rem 0',
    fontSize: '2.25rem',
    color: '#1f2937',
    fontWeight: '700',
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '6px',
    backgroundColor: '#f3f4f6',
  };

  const infoStyle = {
    flex: 1,
  };

  const quantityControlStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };

  const quantityButtonStyle = {
    width: '36px',
    height: '36px',
    padding: 0,
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1.05rem',
    transition: 'all 0.2s ease',
  };

  const removeButtonStyle = {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const checkoutButtonStyle = {
    width: '100%',
    padding: '1rem',
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

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div style={{
          border: '2px dashed #bfdbfe',
          backgroundColor: '#eff6ff',
          padding: '3rem 2rem',
          borderRadius: '8px',
          color: '#1e40af',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>📦</p>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Your cart is empty</p>
          <p style={{ margin: 0, color: '#60a5fa', fontSize: '0.95rem' }}>Start shopping to add items!</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={cardStyle}>
                <img src={item.image} alt={item.name} style={imageStyle} />
                <div style={infoStyle}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontWeight: '600', fontSize: '1.1rem' }}>{item.name}</h3>
                  <p style={{ color: '#16a34a', fontWeight: '700', margin: 0, fontSize: '1.1rem' }}>${item.price.toFixed(2)} each</p>
                </div>
                <div style={quantityControlStyle}>
                  <button
                    onClick={() => handleQuantityChange(idx, (quantities[idx] || 1) - 1)}
                    style={quantityButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e5e7eb';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f3f4f6';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantities[idx] || 1}
                    onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value) || 1)}
                    style={{
                      width: '50px',
                      textAlign: 'center',
                      padding: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      color: '#1f2937',
                    }}
                  />
                  <button
                    onClick={() => handleQuantityChange(idx, (quantities[idx] || 1) + 1)}
                    style={quantityButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e5e7eb';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f3f4f6';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={removeButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{
            border: '2px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
            }}>
              <span>Total ({cart.length} items):</span>
              <span style={{ color: '#16a34a' }}>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            style={checkoutButtonStyle}
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
            ✓ Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}
