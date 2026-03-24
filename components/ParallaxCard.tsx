import React, { useRef, useState, useEffect } from 'react';

interface ParallaxCardProps {
  src: string;
  alt: string;
  className?: string;
  depth?: number; // 0.1 to 1, higher = more movement
}

/**
 * Individual card with parallax effect
 * Responds to mouse movement and scroll
 */
const ParallaxCard: React.FC<ParallaxCardProps> = ({
  src,
  alt,
  className = '',
  depth = 0.5
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const transform = isHovered
    ? `translate(${mousePosition.x * 20 * depth}px, ${mousePosition.y * 20 * depth}px) scale(1.05)`
    : 'translate(0, 0) scale(1)';

  return (
    <div
      ref={cardRef}
      className={`${className} transition-transform duration-300 ease-out`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};

export default ParallaxCard;
