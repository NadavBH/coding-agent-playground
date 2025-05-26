import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
        {/* TODO: Add role="form" and aria-labelledby to connect form with its title for better accessibility */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* TODO: Consider using fieldset and legend to group related form controls */}
          <Form.Group className="mb-3">
            {/* TODO: Add "required" indicator that is accessible to screen readers */}
            <Form.Label>Name</Form.Label>
            {/* TODO: Add aria-required="true" and appropriate aria-describedby for validation error messages */}
            <Form.Control {...register('name', { required: true })} placeholder="Toy name" />
            {/* TODO: Add visible error message with appropriate ARIA attributes for validation feedback */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            {/* TODO: Add aria-required="true" and appropriate aria-describedby for validation error messages */}
            <Form.Control type="number" step="0.01" min="0" {...register('price', { required: true })} placeholder="Toy price" />
            {/* TODO: Add visible error message with appropriate ARIA attributes for validation feedback */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            {/* TODO: Add aria-required="true" and appropriate aria-describedby for validation error messages */}
            <Form.Control {...register('image', { required: true })} placeholder="Image URL" />
            {/* TODO: Add visible error message with appropriate ARIA attributes for validation feedback */}
          </Form.Group>
          {/* TODO: Add more descriptive aria-label like "Add new toy to inventory" */}
          <Button type="submit" variant="primary" className="w-100">Add Toy</Button>
        </Form>
        {/* TODO: Add an accessible status region that announces successful form submission */}
      </Card.Body>
    </Card>
  );
}
