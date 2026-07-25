'use client';

import React from 'react';
import { cn } from '@he/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>({
  label,
  error,
  helperText,
  className,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export { Input, type InputProps };