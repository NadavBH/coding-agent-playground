
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast
} from '@chakra-ui/react';

// Demo toy data
const TOYS = [
  { name: 'Teddy Bear', price: 19.99, image: 'https://placebear.com/200/200' },
  { name: 'Toy Car', price: 9.99, image: 'https://placehold.co/200x200/car' },
  { name: 'Building Blocks', price: 14.99, image: 'https://placehold.co/200x200/blocks' },
  { name: 'Doll', price: 12.99, image: 'https://placehold.co/200x200/doll' },
  { name: 'Puzzle', price: 7.99, image: 'https://placehold.co/200x200/puzzle' },
];

const ADMIN = { username: 'admin', password: 'toyland123' };

function getRandomToys() {
  // Shuffle and pick 3 toys
  return TOYS.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function App() {
  const [toys, setToys] = useState(getRandomToys());
  const [isAdmin, setIsAdmin] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [newToy, setNewToy] = useState({ name: '', price: '', image: '' });
  const toast = useToast();

  const handleLogin = () => {
    if (
      login.username === ADMIN.username &&
      login.password === ADMIN.password
    ) {
      setIsAdmin(true);
      toast({ title: 'Logged in as admin', status: 'success', duration: 2000 });
    } else {
      toast({ title: 'Invalid credentials', status: 'error', duration: 2000 });
    }
  };

  const handleAddToy = () => {
    if (!newToy.name || !newToy.price || !newToy.image) {
      toast({ title: 'All fields required', status: 'warning', duration: 2000 });
      return;
    }
    setToys([...toys, { ...newToy, price: parseFloat(newToy.price) }]);
    setNewToy({ name: '', price: '', image: '' });
    toast({ title: 'Toy added!', status: 'success', duration: 2000 });
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={6} textAlign="center">Contoso Toyland</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={8}>
        {toys.map((toy, idx) => (
          <Box key={idx} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" bg="white">
            <Image src={toy.image} alt={toy.name} boxSize="200px" objectFit="cover" mx="auto" mb={4} />
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
  );
}

export default App;
