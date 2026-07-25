import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@he/types';

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(persist(
  (set, get) => ({
    items: [],
    
    addItem: (productId: string, quantity: number) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.productId === productId);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        return {
          items: [...state.items, { productId, quantity, addedAt: new Date() }],
        };
      });
    },
    
    removeItem: (productId: string) => {
      set((state) => ({
        items: state.items.filter((item) => item.productId !== productId),
      }));
    },
    
    updateQuantity: (productId: string, quantity: number) => {
      if (quantity <= 0) {
        get().removeItem(productId);
        return;
      }
      set((state) => ({
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));
    },
    
    clearCart: () => {
      set({ items: [] });
    },
    
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },
    
    getItemCount: () => {
      return get().items.length;
    },
  }),
  {
    name: 'cart-storage',
  }
));