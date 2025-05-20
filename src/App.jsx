
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  return (
<<<<<<< HEAD
    <Container maxW="container.lg" py={8}>
      <Heading mb={6} textAlign="center">Contoso Toyland</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={8}>
        {toys.map((toy, idx) => (
          <Box key={idx} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" bg="white">
            <Image 
              src={toy.image} 
              alt={toy.name} 
              boxSize="200px" 
              objectFit="cover" 
              mx="auto" 
              mb={4}
              fallback={<Box boxSize="200px" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
                <Text>No Image Available</Text>
              </Box>}
            />
            <Heading as="h3" size="md" mb={2}>{toy.name}</Heading>
            <Text fontWeight="bold">${toy.price.toFixed(2)}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {!isAdmin ? (
        <Box maxW="sm" mx="auto" p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="gray.50">
          <Heading as="h2" size="md" mb={4}>Admin Login</Heading>
          <VStack spacing={3}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={login.username}
                onChange={e => setLogin({ ...login, username: e.target.value })}
                placeholder="Enter username"
                autoComplete="username"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={login.password}
                onChange={e => setLogin({ ...login, password: e.target.value })}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </FormControl>
            <Button colorScheme="teal" w="full" onClick={handleLogin}>Login</Button>
          </VStack>
        </Box>
      ) : (
        <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="gray.50">
          <Heading as="h2" size="md" mb={4}>Add New Toy</Heading>
          <VStack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={newToy.name}
                onChange={e => setNewToy({ ...newToy, name: e.target.value })}
                placeholder="Toy name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={newToy.price}
                onChange={e => setNewToy({ ...newToy, price: e.target.value })}
                placeholder="Toy price"
                min={0}
                step={0.01}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={newToy.image}
                onChange={e => setNewToy({ ...newToy, image: e.target.value })}
                placeholder="Image URL"
              />
            </FormControl>
            <Button colorScheme="teal" w="full" onClick={handleAddToy}>Add Toy</Button>
          </VStack>
        </Box>
      )}
    </Container>
=======
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
>>>>>>> 4b6a66d (Update toy images and migrate to React Bootstrap, Zustand, and new architecture)
  );
}

export default App;
