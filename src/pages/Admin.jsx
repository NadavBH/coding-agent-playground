import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

/**
 * Admin component that provides an interface for adding new toy products
 * @returns {JSX.Element} A form with fields for toy name, price, and image URL
 */
export default function Admin() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Simple hardcoded credentials for demo only
  // TODO: Move authentication to a secure backend in production. Never store credentials in frontend code.
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'toyland123';

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const onSubmit = data => {
    // Here you would add the toy to your backend or state
    toast.success('Toy added (demo only)!');
    reset();
  };

  // TODO: Add session expiration logic for better security in production.

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.info('Logged out.');
  };

  if (!isAuthenticated) {
    return (
      <Card className="mx-auto" style={{ maxWidth: 400 }}>
        <Card.Body>
          <Card.Title>Admin Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" placeholder="Enter username" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Enter password" required />
            </Form.Group>
            {loginError && <div className="text-danger mb-2">{loginError}</div>}
            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title>Add New Toy</Card.Title>
        <Button variant="outline-secondary" className="mb-3 w-100" onClick={handleLogout}>Logout</Button>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              {...register('name', { 
                required: 'Name is required', 
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 50, message: 'Name must be at most 50 characters' },
                pattern: { value: /^[a-zA-Z0-9 .,'-]+$/, message: 'Invalid characters in name' }
              })} 
              placeholder="Toy name" 
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              step="0.01" 
              min="0" 
              {...register('price', { 
                required: 'Price is required', 
                min: { value: 0.01, message: 'Price must be at least $0.01' },
                max: { value: 1000, message: 'Price must be less than $1000' }
              })} 
              placeholder="Toy price" 
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              {...register('image', { 
                required: 'Image URL is required', 
                pattern: { value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i, message: 'Enter a valid image URL' }
              })} 
              placeholder="Image URL" 
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Add Toy</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
