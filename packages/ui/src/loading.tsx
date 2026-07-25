'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={`bg-gray-200 rounded animate-pulse ${className}`}
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  />
);

const Loading: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => (
  <div className={fullScreen ? 'fixed inset-0 flex items-center justify-center bg-white' : 'flex items-center justify-center'}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"
    />
  </div>
);

export { Skeleton, Loading };