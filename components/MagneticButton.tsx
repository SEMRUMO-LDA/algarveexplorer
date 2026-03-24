import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticType?: 'dark' | 'light' | 'orange';
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticType = 'orange',
  strength = 0.3,
  as = 'button',
  href,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Apply magnetic pull with strength factor
    setPosition({
      x: deltaX * strength,
      y: deltaY * strength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === 'a' ? motion.a : as === 'div' ? motion.div : motion.button;

  const componentProps = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    'data-magnetic': magneticType,
    animate: {
      x: position.x,
      y: position.y
    },
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      mass: 0.1
    },
    ...(as === 'a' && href ? { href } : {}),
    ...(onClick ? { onClick } : {}),
    ...props
  };

  return (
    <Component {...componentProps}>
      {children}
    </Component>
  );
};

export default MagneticButton;
