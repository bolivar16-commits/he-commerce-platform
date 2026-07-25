'use client';

import React from 'react';
import { cn } from '@he/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}, ref) => {
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-gray-100 text-gray-800',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };
  
  return (
    <span
      ref={ref}
      className={cn('inline-block rounded-full font-medium', variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };