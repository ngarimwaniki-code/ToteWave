import React from 'react';

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`block w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${className}`}
    ref={ref}
    {...props}
  />
));