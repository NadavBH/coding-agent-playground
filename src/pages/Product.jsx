import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useStore } from '../store';
import { toast } from 'react-toastify';

const TOYS = [
  { id: 1, name: 'Teddy Bear', price: 19.99, image: 'https://www.publicdomainpictures.net/pictures/130000/velka/teddy-bear-14374486104Lp.jpg' }, // Teddy Bear
  { id: 2, name: 'Toy Car', price: 9.99, image: 'https://images.pexels.com/photos/97353/pexels-photo-97353.jpeg?cs=srgb&dl=pexels-mikebirdy-97353.jpg&fm=jpg' }, // Toy Car
  { id: 3, name: 'Building Blocks', price: 14.99, image: 'https://cdn.pixabay.com/photo/2022/01/02/12/34/bricks-6909999_1280.jpg' }, // Building Blocks
  { id: 4, name: 'Doll', price: 12.99, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' }, // Doll
  { id: 5, name: 'Puzzle', price: 7.99, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' }, // Puzzle
];

export default function Product() {
  const { id } = useParams();
  const toy = TOYS.find(t => t.id === Number(id));
  const addToCart = useStore(s => s.addToCart);

  if (!toy) return <div>Product not found.</div>;

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Img variant="top" src={toy.image} alt={toy.name} />
      <Card.Body>
        <Card.Title>{toy.name}</Card.Title>
        <Card.Text>${toy.price.toFixed(2)}</Card.Text>
        <Button onClick={() => { addToCart(toy); toast.success('Added to cart!'); }} variant="success">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
