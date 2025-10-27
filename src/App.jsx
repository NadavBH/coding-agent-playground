
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

/**
 * Main application component for Contoso Toyland.
 * Renders the navigation bar and sets up routing for the toy store application.
 * Provides navigation links to Home, Cart, and Admin pages.
 * 
 * @returns {JSX.Element} The main app layout with navigation and routing
 */
function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Contoso Toyland</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
