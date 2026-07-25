'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useWishlistStore } from '@/store/wishlist';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  const { data: products = [] } = useQuery({
    queryKey: ['wishlist-products', items.map((i) => i.productId)],
    queryFn: async () => {
      if (items.length === 0) return [];
      const res = await fetch('/api/products/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: items.map((i) => i.productId) }),
      });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: items.length > 0,
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">Save your favorite perfumes for later!</p>
            <Link href="/products">
              <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                Explore Perfumes
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg"
              >
                <div className="relative w-full h-64 bg-gray-100">
                  {/* Product image would go here */}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-black mb-4">€{product.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeItem(product.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}