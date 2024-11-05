import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedText = ({ text, className = "" }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
};