import * as React from "react";
import { cn } from "../../lib/utils";

const alertVariants = {
  success: "bg-green-100 text-green-800 border-green-200",
  error: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

const Alert = ({ variant = "info", className, children, ...props }) => {
  const alertClass = alertVariants[variant] || alertVariants.info;

  return (
    <div
      className={cn("border-l-4 p-4 rounded-md", alertClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertTitle = ({ className, children }) => {
  return <p className={cn("font-bold", className)}>{children}</p>;
};

const AlertDescription = ({ className, children }) => {
  return <p className={cn(className)}>{children}</p>;
};

// Exporting the components
export { Alert, AlertTitle, AlertDescription };
