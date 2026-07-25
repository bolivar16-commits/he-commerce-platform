'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-8">Get exclusive offers and fragrance tips delivered to your inbox.</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || success}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : success ? '✓ Subscribed' : 'Subscribe'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}