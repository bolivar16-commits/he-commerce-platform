'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Floral', icon: '🌸', href: '/products?category=floral' },
  { name: 'Oriental', icon: '✨', href: '/products?category=oriental' },
  { name: 'Woody', icon: '🌲', href: '/products?category=woody' },
  { name: 'Fresh', icon: '💨', href: '/products?category=fresh' },
];

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Shop by Fragrance Family
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg text-center cursor-pointer shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-semibold text-gray-900">{category.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}