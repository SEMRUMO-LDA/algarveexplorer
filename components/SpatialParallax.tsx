'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SpatialParallaxProps {
  layers: {
    src: string;
    depth: number; // 0 = background (slowest), 1 = foreground (fastest)
    opacity?: number;
    blur?: number;
  }[];
  className?: string;
  children?: React.ReactNode;
}

const SpatialParallax: React.FC<SpatialParallaxProps> = ({ layers, className = '', children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setScrollPosition(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  const getLayerTransform = (depth: number) => {
    // Stronger effect based on depth
    const scrollEffect = (scrollPosition - 0.5) * 100 * depth;
    const mouseEffectX = mousePosition.x * 30 * depth;
    const mouseEffectY = mousePosition.y * 30 * depth;

    // Mobile: only scroll parallax
    if (isMobile) {
      return {
        transform: `translateY(${scrollEffect}px) scale(${1 + depth * 0.1})`,
        transition: 'transform 0.1s ease-out'
      };
    }

    // Desktop: scroll + mouse parallax
    return {
      transform: `translate(${mouseEffectX}px, ${mouseEffectY + scrollEffect}px) scale(${1 + depth * 0.1})`,
      transition: 'transform 0.05s ease-out'
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Render layers from background to foreground */}
      {[...layers].sort((a, b) => a.depth - b.depth).map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            ...getLayerTransform(layer.depth),
            opacity: layer.opacity ?? 1,
            filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            zIndex: Math.floor(layer.depth * 10)
          }}
        >
          <img
            src={layer.src}
            alt=""
            className="w-full h-full object-cover"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            loading="lazy"
          />
        </div>
      ))}

      {/* Content overlay */}
      {children && (
        <div className="relative z-50 h-full flex items-end">
          {children}
        </div>
      )}
    </div>
  );
};

export default SpatialParallax;
