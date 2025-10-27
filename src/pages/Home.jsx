import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export default function Home() {
  const toys = useStore(s => s.toys);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  const logoStyle = {
    height: '80px',
    width: '80px',
    objectFit: 'contain',
    marginBottom: '1.5rem',
  };

  const titleStyle = {
    fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#1f2937',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    width: '100%',
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
  };

  const cardHoverStyle = {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    transform: 'translateY(-4px)',
  };

  const [hoveredCard, setHoveredCard] = React.useState(null);

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: '#f3f4f6',
  };

  const cardBodyStyle = {
    padding: '1rem',
  };

  const cardTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
    wordBreak: 'break-word',
  };

  const cardPriceStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: '1rem',
  };

  const linkStyle = {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <img src="/contosologo.png" alt="Contoso Logo" style={logoStyle} />
      <h1 style={titleStyle}>Welcome to Contoso Toyland</h1>
      <div style={gridStyle}>
        {toys.map(toy => (
          <div
            key={toy.id}
            style={{
              ...cardStyle,
              ...(hoveredCard === toy.id ? cardHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCard(toy.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src={toy.image} alt={toy.name} style={imageStyle} />
            <div style={cardBodyStyle}>
              <h2 style={cardTitleStyle}>{toy.name}</h2>
              <p style={cardPriceStyle}>${toy.price.toFixed(2)}</p>
              <Link
                to={`/product/${toy.id}`}
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
