'use client';

import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatPrice } from '@he/utils';
import { useState } from 'react';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  fragrance: {
    family: string;
    intensity: string;
  };
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(params.slug);

  const { data: product } = useQuery<ProductDetail>({
    queryKey: ['product', params.slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${params.slug}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative w-full h-20 bg-gray-100 rounded cursor-pointer hover:ring-2 ring-black">
                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-bold">{formatPrice(product.price)}</div>

              {/* Fragrance Info */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Family</p>
                  <p className="text-lg">{product.fragrance.family}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Intensity</p>
                  <p className="text-lg capitalize">{product.fragrance.intensity}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Notes</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Top</p>
                      <p className="text-sm">{product.notes.top.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Heart</p>
                      <p className="text-sm">{product.notes.heart.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Base</p>
                      <p className="text-sm">{product.notes.base.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Stock Status */}
              <div className="text-sm font-semibold">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product.id, quantity)}
                  disabled={product.stock === 0}
                  className="flex-1 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToWishlist(product.id)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  {inWishlist ? '❤️' : '🤍'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}