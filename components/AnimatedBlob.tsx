import React from 'react';

interface AnimatedBlobProps {
  className?: string;
  size?: string;
  opacity?: number;
  blur?: string;
  delay?: string;
  duration?: string;
  alternate?: boolean;
  blendMode?: 'screen' | 'multiply' | 'color-dodge' | 'normal' | 'soft-light' | 'plus-lighter';
}

const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  className = "",
  size = "w-96 h-96",
  opacity = 1,
  blur = "100px",
  delay = "0s",
  duration = "30s",
  alternate = false,
  blendMode = 'normal'
}) => {
  return (
    <div
      className={`absolute pointer-events-none rounded-full ${size} ${className}
        ${alternate ? 'animate-blob-move' : 'animate-blob-morph'}`}
      style={{
        animationDelay: delay,
        animationDuration: duration,
        mixBlendMode: blendMode,
        filter: `blur(${blur})`,
        opacity: opacity,
        transform: `scale(var(--blob-scale, 1))`,
        background: 'radial-gradient(circle, rgba(218,105,39,0.9) 0%, rgba(255,180,100,0.7) 35%, rgba(218,105,39,0.4) 70%, transparent 100%)',
        transition: 'background 3s ease-in-out, opacity 3s ease-in-out, transform 5s ease-in-out',
        willChange: 'transform, opacity, filter',
        zIndex: 0
      }}
    />
  );
};

export default AnimatedBlob;
