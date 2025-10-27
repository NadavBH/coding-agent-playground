import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getToyById = useStore(s => s.getToyById);
  const addToCart = useStore(s => s.addToCart);
  
  const [toy, setToy] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundToy = getToyById(id);
      setToy(foundToy);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, getToyById]);

  const handleAddToCart = () => {
    if (!toy) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(toy);
    }
    
    alert(`${quantity} ${toy.name}${quantity > 1 ? 's' : ''} added to your cart!`);
    setQuantity(1);
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  };

  const backButtonStyle = {
    padding: '0.6rem 1.2rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    transition: 'all 0.2s ease',
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    backgroundColor: '#ffffff',
  };

  const flexStyle = {
    display: 'flex',
    gap: '3rem',
    marginBottom: '2rem',
  };

  const imageStyle = {
    flex: '0 0 45%',
    maxHeight: '450px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
  };

  const infoStyle = {
    flex: 1,
  };

  const titleStyle = {
    margin: '0 0 0.75rem 0',
    fontSize: '2.25rem',
    color: '#1f2937',
    fontWeight: '700',
  };

  const priceStyle = {
    fontSize: '1.75rem',
    color: '#16a34a',
    fontWeight: '700',
    margin: '1rem 0 1.5rem 0',
  };

  const descriptionStyle = {
    color: '#6b7280',
    lineHeight: '1.7',
    marginBottom: '2rem',
    fontSize: '1.05rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.75rem',
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '1.05rem',
  };

  const inputStyle = {
    padding: '0.75rem',
    fontSize: '1rem',
    width: '100px',
    border: '2px solid #e5e7eb',
    borderRadius: '6px',
    color: '#1f2937',
    transition: 'border-color 0.2s ease',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    marginTop: '2rem',
  };

  const primaryButtonStyle = {
    padding: '0.85rem 1.75rem',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  };

  const secondaryButtonStyle = {
    padding: '0.85rem 1.75rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  };

  const infoBoxStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#dbeafe',
    borderLeft: '4px solid #0284c7',
    borderRadius: '6px',
    color: '#0c4a6e',
  };

  const infoPStyle = {
    margin: '0.5rem 0',
    fontWeight: '600',
    fontSize: '0.95rem',
  };

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
  };

  const spinnerStyle = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  const errorContainerStyle = {
    ...cardStyle,
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
    color: '#991b1b',
    textAlign: 'center',
    padding: '3rem 2rem',
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingContainerStyle}>
          <div style={spinnerStyle} />
          <p style={{ marginTop: '1.5rem', color: '#6b7280', fontSize: '1.1rem' }}>Loading product details...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!toy) {
    return (
      <div style={containerStyle}>
        <div style={errorContainerStyle}>
          <p style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '700' }}>⚠️ Product Not Found</p>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '1rem' }}>The toy you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              ...primaryButtonStyle,
              backgroundColor: '#991b1b',
            }}
          >
            ← Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        ← Back
      </button>
      
      <div style={cardStyle}>
        <div style={flexStyle}>
          <img src={toy.image} alt={toy.name} style={imageStyle} />
          <div style={infoStyle}>
            <h1 style={titleStyle}>{toy.name}</h1>
            <p style={priceStyle}>${toy.price.toFixed(2)}</p>
            <p style={descriptionStyle}>
              This is a premium toy item from Contoso Toyland. Perfect for entertainment and imagination! High-quality craftsmanship and design make this an ideal choice for toy enthusiasts of all ages.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>Quantity:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={inputStyle}
              />
            </div>

            <div style={buttonContainerStyle}>
              <button 
                onClick={handleAddToCart}
                style={primaryButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
              >
                🛒 Add to Cart
              </button>
              <button 
                onClick={() => navigate('/')}
                style={secondaryButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#eff6ff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Continue Shopping
              </button>
            </div>

            <div style={infoBoxStyle}>
              <p style={infoPStyle}>✓ Free shipping on orders over $50</p>
              <p style={infoPStyle}>✓ 30-day money back guarantee</p>
              <p style={infoPStyle}>✓ Official Contoso Toyland product</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
