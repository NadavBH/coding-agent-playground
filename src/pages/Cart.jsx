import React from 'react';
import { useStore } from '../store';
import { ListGroup, Button } from 'react-bootstrap';

/**
 * Cart component that displays the current items in the user's shopping cart.
 * Shows a list of cart items with their names, prices, and remove buttons.
 * If the cart is empty, displays a message indicating this.
 * 
 * @returns {JSX.Element} A list of items in the user's cart with options to remove items
 */
export default function Cart() {
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);

  return (
    <div>
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cart.map((item, idx) => (
            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
              <span>{item.name} (${item.price.toFixed(2)})</span>
              <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
