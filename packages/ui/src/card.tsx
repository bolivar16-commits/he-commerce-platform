'use client';

import React from 'react';
import { cn } from '@he/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>({
  hover = false,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        hover && 'hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    />
  );
});

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <div ref={ref} className={cn('p-6 border-b border-gray-200', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));
CardBody.displayName = 'CardBody';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <div ref={ref} className={cn('p-6 border-t border-gray-200', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter, type CardProps };