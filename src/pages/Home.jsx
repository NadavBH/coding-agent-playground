import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export default function Home() {
  const toys = useStore(s => s.toys);
  const [hoveredCardId, setHoveredCardId] = React.useState(null);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    backgroundColor: 'white',
  };

  const getCardStyle = (id) => (hoveredCardId === id ? {
    ...cardStyle,
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    borderColor: '#2563eb',
  } : cardStyle);

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const bodyStyle = {
    padding: '1.25rem',
  };

  const priceStyle = {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    margin: '0.75rem 0',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: '#1f2937' }}>Featured Toys</h2>
        <p style={{ color: '#6b7280', margin: 0 }}>Discover our amazing collection of toys</p>
      </div>
      <div style={gridStyle}>
        {toys && toys.length > 0 ? (
          toys.map(toy => (
            <div
              key={toy.id}
              style={getCardStyle(toy.id)}
              onMouseEnter={() => setHoveredCardId(toy.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={toy.image} alt={toy.name} style={imageStyle} />
              </div>
              <div style={bodyStyle}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1f2937' }}>{toy.name}</h3>
                <p style={priceStyle}>${toy.price.toFixed(2)}</p>
                <Link to={`/product/${toy.id}`} style={buttonStyle}>
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            <p>No toys available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
