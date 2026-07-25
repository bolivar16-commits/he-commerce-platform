'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/store/wishlist';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@he/utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  rating: number;
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
        </div>
      </Link>

      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id))}
        className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? '❤️' : '🤍'}
      </motion.button>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-600 cursor-pointer transition">
            {product.name}
          </h3>
        </Link>

        {/* Price and Cart */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-black">{formatPrice(product.price)}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product.id, 1)}
            className="px-3 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
            aria-label="Add to cart"
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}