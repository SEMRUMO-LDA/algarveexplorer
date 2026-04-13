'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CinematicTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: 'word' | 'line' | 'none';
}

const CinematicText: React.FC<CinematicTextProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.05,
  splitBy = 'word'
}) => {
  // If we don't want to split, just animate the whole element
  if (splitBy === 'none') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Convert children to string for splitting
  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return <div className={className}>{children}</div>;
  }

  // Split by words or lines
  const items = splitBy === 'word'
    ? text.split(' ')
    : text.split('\n');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((word, index) => (
        <motion.span
          key={index}
          variants={item}
          style={{ display: 'inline-block', marginRight: splitBy === 'word' ? '0.25em' : '0' }}
        >
          {word}
          {splitBy === 'line' && <br />}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default CinematicText;
