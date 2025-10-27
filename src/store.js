import { create } from 'zustand';

const initialToys = [
  { id: 1, name: 'Classic Teddy Bear', price: 24.99, image: 'https://static4.depositphotos.com/1016383/320/i/950/depositphotos_3207311-stock-photo-teddy-bear.jpg' },
  { id: 2, name: 'Wooden Building Blocks', price: 34.99, image: 'https://st.depositphotos.com/1837549/1445/i/600/depositphotos_14455295-stock-photo-last-brick-on-the-wall.jpg' },
  { id: 3, name: 'Action Figure Set', price: 19.99, image: 'https://st3.depositphotos.com/4147207/32948/i/600/depositphotos_329480942-stock-photo-kuala-lumpur-malaysia-april-2018.jpg' },
  { id: 4, name: 'Remote Control Car', price: 49.99, image: 'https://st.depositphotos.com/2702761/3300/i/600/depositphotos_33005961-stock-photo-remote-controlled-toy-car-with.jpg' },
  { id: 5, name: 'Puzzle Game Set', price: 14.99, image: 'https://static7.depositphotos.com/1007298/717/i/600/depositphotos_7179193-stock-photo-jigsaw-puzzle.jpg' },
  { id: 6, name: 'Board Game Collection', price: 29.99, image: 'https://st5.depositphotos.com/78102430/74650/i/600/depositphotos_746501320-stock-photo-man-playing-board-game-chess.jpg' },
];

export const useStore = create(set => ({
  toys: initialToys,
  cart: [],
  
  addToy: (toy) => set(state => ({ toys: [...state.toys, toy] })),
  addToCart: (toy) => set(state => ({ cart: [...state.cart, toy] })),
  removeFromCart: (index) => set(state => ({ cart: state.cart.filter((_, i) => i !== index) })),
  
  getToyById: (id) => {
    const toys = useStore.getState().toys;
    return toys.find(toy => toy.id === parseInt(id));
  },
}));
