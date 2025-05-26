import React from 'react';
import { useStore } from '../store';
import { ListGroup, Button } from 'react-bootstrap';

/**
 * Cart component that displays the user's shopping cart contents
 * @returns {JSX.Element} A list of cart items with their prices, a total sum, and a checkout button
 */
export default function Cart() {
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);

  /**
   * Removes an item from the shopping cart
   * @param {number} itemId - The ID of the item to be removed from the cart
   */
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Calculate total cart amount
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ListGroup>
            {cart.map((item, idx) => (
              <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                <span>{item.name} (${item.price.toFixed(2)})</span>
                <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="d-flex justify-content-end mt-2">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </div>
        </>
      )}
      <div className="mt-3">
        <Button variant="primary">Proceed to Payment</Button>
      </div>
    </div>
  );
}
