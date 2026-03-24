import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  scrollStrength?: number;
  mouseStrength?: number;
  enableMouseParallax?: boolean;
  objectPosition?: string;
  enableBlur?: boolean;
  blurAmount?: number;
  glassEffect?: boolean;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  scrollStrength = 0.1,
  mouseStrength = 0.02,
  enableMouseParallax = true,
  objectPosition = 'center'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${scrollStrength * 100}%`, `-${scrollStrength * 100}%`]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.1, 1, 1.1]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableMouseParallax) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate relative position (-1 to 1)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);

    // Apply parallax
    mouseX.set(relativeX * mouseStrength * 100);
    mouseY.set(relativeY * mouseStrength * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full h-full ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`absolute w-full object-cover ${className}`}
        style={{
          height: `${100 + scrollStrength * 200}%`,
          top: `-${scrollStrength * 100}%`,
          y: isInView ? y : 0,
          scale: isInView ? scale : 1.05,
          x: enableMouseParallax ? mouseXSpring : 0,
          rotateY: enableMouseParallax ? useTransform(mouseXSpring, [-100, 100], [-2, 2]) : 0,
          rotateX: enableMouseParallax ? useTransform(mouseYSpring, [-100, 100], [2, -2]) : 0,
          objectPosition
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.05 }}
        transition={{
          scale: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }}
      />
    </div>
  );
};

export default ParallaxImage;
