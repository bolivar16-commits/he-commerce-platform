'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ROUTES } from '@he/config';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { motion } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-black">
            HE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={ROUTES.PRODUCTS} className="text-gray-600 hover:text-black transition">
              Perfumes
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black transition">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black transition">
              Blog
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black transition">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Wishlist */}
            <Link href={ROUTES.WISHLIST} className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-black transition"
              >
                ♡
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Cart */}
            <Link href={ROUTES.CART} className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-black transition"
              >
                🛍
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Account */}
            <Link href={ROUTES.LOGIN} className="text-gray-600 hover:text-black transition">
              👤
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-black"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-gray-200"
          >
            <Link href={ROUTES.PRODUCTS} className="block py-2 text-gray-600 hover:text-black">
              Perfumes
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-black">
              About
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-black">
              Blog
            </Link>
            <Link href="#" className="block py-2 text-gray-600 hover:text-black">
              Contact
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}