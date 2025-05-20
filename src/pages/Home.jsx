import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Demo toy data
const TOYS = [
  { id: 1, name: 'Teddy Bear', price: 19.99, image: 'https://www.publicdomainpictures.net/pictures/130000/velka/teddy-bear-14374486104Lp.jpg' }, // Teddy Bear
  { id: 2, name: 'Toy Car', price: 9.99, image: 'https://images.pexels.com/photos/97353/pexels-photo-97353.jpeg?cs=srgb&dl=pexels-mikebirdy-97353.jpg&fm=jpg' }, // Toy Car
  { id: 3, name: 'Building Blocks', price: 14.99, image: 'https://cdn.pixabay.com/photo/2022/01/02/12/34/bricks-6909999_1280.jpg' }, // Building Blocks
  { id: 4, name: 'Doll', price: 12.99, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' }, // Doll
  { id: 5, name: 'Puzzle', price: 7.99, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' }, // Puzzle
  { id: 6, name: 'Toy Power Sword', price: 15.99, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' }, // Toy Power Sword (placeholder image)
];

export default function Home() {
  return (
    <div>
      <h2 className="mb-4">Featured Toys</h2>
      <Row xs={1} md={3} className="g-4">
        {TOYS.map(toy => (
          <Col key={toy.id}>
            <Card>
              <Card.Img variant="top" src={toy.image} alt={toy.name} />
              <Card.Body>
                <Card.Title>{toy.name}</Card.Title>
                <Card.Text>${toy.price.toFixed(2)}</Card.Text>
                <Button as={Link} to={`/product/${toy.id}`} variant="primary">View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
