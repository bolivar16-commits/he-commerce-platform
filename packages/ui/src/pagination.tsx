'use client';

import React from 'react';
import { cn } from '@he/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
  const visiblePages = pages.slice(start, start + maxVisible);
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        ←
      </button>
      
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'px-3 py-2 border rounded',
            currentPage === page && 'bg-black text-white'
          )}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export { Pagination, type PaginationProps };