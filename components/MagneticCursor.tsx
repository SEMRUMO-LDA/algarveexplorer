import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  scale: number;
  color: string;
  blend: string;
}

const MagneticCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<CursorState>({
    scale: 1,
    color: 'rgba(218, 105, 39, 0.4)',
    blend: 'normal'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop (pointer device)
    const checkPointerDevice = () => {
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      setIsVisible(hasPointer);
    };

    checkPointerDevice();
    window.addEventListener('resize', checkPointerDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if hovering magnetic element
      if (target.closest('[data-magnetic]')) {
        const magneticType = target.closest('[data-magnetic]')?.getAttribute('data-magnetic');

        if (magneticType === 'dark') {
          setCursorState({
            scale: 1.5,
            color: 'rgba(13, 67, 87, 0.6)',
            blend: 'normal'
          });
        } else if (magneticType === 'light') {
          setCursorState({
            scale: 1.5,
            color: 'rgba(218, 105, 39, 0.6)',
            blend: 'normal'
          });
        } else if (magneticType === 'orange') {
          setCursorState({
            scale: 1.8,
            color: 'rgba(218, 105, 39, 0.8)',
            blend: 'screen'
          });
        }
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorState({
          scale: 1.3,
          color: 'rgba(218, 105, 39, 0.5)',
          blend: 'normal'
        });
      }
    };

    const handleMouseLeave = () => {
      setCursorState({
        scale: 1,
        color: 'rgba(218, 105, 39, 0.4)',
        blend: 'normal'
      });
    };

    if (isVisible) {
      window.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkPointerDevice);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
        }}
        animate={{
          scale: cursorState.scale,
          backgroundColor: cursorState.color,
        }}
        transition={{
          scale: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          backgroundColor: { duration: 0.4 }
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          backgroundColor: '#da6927'
        }}
      />

      <style>{`
        * {
          cursor: none !important;
        }

        a, button, [role="button"], input, textarea, select {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default MagneticCursor;
