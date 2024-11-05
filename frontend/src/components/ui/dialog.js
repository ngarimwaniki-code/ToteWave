import React, { useState } from 'react';

const Dialog = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </>
  );
};

const DialogTrigger = ({ children, setIsOpen }) => {
  return React.cloneElement(children, {
    onClick: () => setIsOpen(true),
  });
};

const DialogContent = ({ children, isOpen, setIsOpen, ...props }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        {...props}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        {children}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const DialogHeader = ({ children, ...props }) => (
  <div {...props} className="mb-4">
    {children}
  </div>
);

const DialogTitle = ({ children, ...props }) => (
  <h3 {...props} className="text-lg font-medium">
    {children}
  </h3>
);

const DialogFooter = ({ children, ...props }) => (
  <div {...props} className="mt-4 flex justify-end">
    {children}
  </div>
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter };