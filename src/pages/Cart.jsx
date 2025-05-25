import React from 'react';
import { useStore } from '../store';
import { ListGroup, Button } from 'react-bootstrap';

/**
 * Cart component that displays the user's shopping cart contents.
 * Shows items added to the cart with ability to remove items and displays the total price.
 * 
 * @returns {JSX.Element} A shopping cart interface with item list, total price, and checkout button
 */
export default function Cart() {
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);

  /**
   * Removes an item from the shopping cart.
   * Uses the removeFromCart function from the global store.
   * 
   * @param {number|string} itemId - The unique identifier of the item to remove
   */
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    // TODO: Replace div with semantic HTML element like <main> or <section> for better document structure
    <div>
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        // TODO: Add aria-live="polite" to announce cart status changes to screen reader users
        <p>Your cart is empty.</p>
      ) : (
        // TODO: Add appropriate ARIA attributes to identify this as a list of cart items
        <ListGroup>
          {cart.map((item, idx) => (
            // TODO: Use a more stable unique identifier than array index for the key prop
            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
              {/* TODO: Add appropriate ARIA attributes to identify this as a product name and price */}
              <span>{item.name} (${item.price.toFixed(2)})</span>
              {/* TODO: Add a more descriptive aria-label like "Remove [item name] from cart" */}
              <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {cart.length > 0 && (
        // TODO: Add appropriate ARIA role or aria-label to identify this as the cart total
        <div className="mt-3 d-flex justify-content-end fw-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}
      <div className="mt-3">
        {/* TODO: Add aria-disabled="true" when cart is empty and more descriptive aria-label */}
        <Button variant="primary">Proceed to Payment</Button>
      </div>
    </div>
  );
}
