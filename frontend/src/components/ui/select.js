import React from 'react';

export const Select = React.forwardRef(({ children, className, ...props }, ref) => (
  <select
    className={`block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));

export const SelectTrigger = React.forwardRef(({ children, className, ...props }, ref) => (
  <div className={`relative ${className}`}>
    <Select ref={ref} {...props}>
      {children}
    </Select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
));

export const SelectContent = ({ children }) => (
  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
    {children}
  </div>
);

export const SelectItem = React.forwardRef(({ children, className, ...props }, ref) => (
  <option
    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </option>
));

export const SelectValue = React.forwardRef(({ children, ...props }, ref) => (
  <span ref={ref} {...props}>{children}</span>
));