import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem } from '@he/types';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(persist(
  (set, get) => ({
    items: [],
    
    addItem: (productId: string) => {
      set((state) => {
        if (state.items.some((item) => item.productId === productId)) {
          return state;
        }
        return {
          items: [...state.items, { productId, addedAt: new Date() }],
        };
      });
    },
    
    removeItem: (productId: string) => {
      set((state) => ({
        items: state.items.filter((item) => item.productId !== productId),
      }));
    },
    
    isInWishlist: (productId: string) => {
      return get().items.some((item) => item.productId === productId);
    },
    
    clearWishlist: () => {
      set({ items: [] });
    },
    
    getItemCount: () => {
      return get().items.length;
    },
  }),
  {
    name: 'wishlist-storage',
  }
));