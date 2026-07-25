'use client';

import React from 'react';
import { cn } from '@he/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-lg';
  
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
    ghost: 'text-black hover:bg-gray-100',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? '...' : children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button, type ButtonProps };