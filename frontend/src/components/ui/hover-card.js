import React, { useState } from 'react';
import '../../assets/styles/ui.css';

export const HoverCard = ({ children }) => {
  return <div className="hover-card">{children}</div>;
};

export const HoverCardTrigger = ({ children }) => {
  return <div className="hover-card-trigger">{children}</div>;
};

export const HoverCardContent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="hover-card-content"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};