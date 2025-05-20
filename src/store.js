import { create } from 'zustand';

export const useStore = create(set => ({
  cart: [],
  addToCart: (toy) => set(state => ({ cart: [...state.cart, toy] })),
  removeFromCart: (id) => set(state => ({ cart: state.cart.filter(item => item.id !== id) })),
}));
