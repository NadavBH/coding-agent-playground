import React from 'react';
import { useStore } from '../store';
import { ListGroup, Button } from 'react-bootstrap';

export default function Cart() {
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
              <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {cart.length > 0 && (
        <div className="mt-3 d-flex justify-content-end fw-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}
      <div className="mt-3">
        <Button variant="primary">Proceed to Payment</Button>
      </div>
    </div>
  );
}
