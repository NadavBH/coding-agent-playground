import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

/**
 * Admin component that provides a form to add new toys to the inventory.
 * Allows administrators to input toy name, price, and image URL.
 * Shows a success toast notification when a toy is added (demo functionality).
 * 
 * @returns {JSX.Element} A form card for adding new toys to the inventory
 */
export default function Admin() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    // Here you would add the toy to your backend or state
    toast.success('Toy added (demo only)!');
    reset();
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title>Add New Toy</Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register('name', { required: true })} placeholder="Toy name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" step="0.01" min="0" {...register('price', { required: true })} placeholder="Toy price" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control {...register('image', { required: true })} placeholder="Image URL" />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Add Toy</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
