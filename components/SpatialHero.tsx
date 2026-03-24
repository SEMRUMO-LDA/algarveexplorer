import React from 'react';
import SpatialParallax from './SpatialParallax';

interface SpatialHeroProps {
  backgroundImage: string;
  midgroundImage?: string;
  foregroundImage?: string;
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
}

/**
 * Premium Spatial Hero Component with 2.5D Parallax Effect
 *
 * Creates depth and volume by layering images at different depths
 * that respond to mouse movement and scroll position.
 *
 * Usage:
 * <SpatialHero
 *   backgroundImage="/image/cliffs-wide.jpg"
 *   midgroundImage="/image/boat-layer.png"  // Optional, with transparency
 *   foregroundImage="/image/water-layer.png" // Optional, with transparency
 *   title="DISCOVER THE ALGARVE"
 *   subtitle="ADVENTURES"
 *   description="Experience nature in its purest form"
 * />
 */
const SpatialHero: React.FC<SpatialHeroProps> = ({
  backgroundImage,
  midgroundImage,
  foregroundImage,
  title,
  subtitle,
  description,
  children
}) => {
  // Build layers array based on provided images
  const layers = [
    // Background layer (slowest movement)
    {
      src: backgroundImage,
      depth: 0.3,
      opacity: 1,
      blur: 0
    },
    // Midground layer (medium movement) - only if provided
    ...(midgroundImage ? [{
      src: midgroundImage,
      depth: 0.6,
      opacity: 0.9,
      blur: 0
    }] : []),
    // Foreground layer (fastest movement) - only if provided
    ...(foregroundImage ? [{
      src: foregroundImage,
      depth: 1,
      opacity: 0.8,
      blur: 0
    }] : [])
  ];

  return (
    <SpatialParallax
      layers={layers}
      className="relative h-[90vh] md:h-screen"
    >
      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/40 to-transparent z-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d4357]/60 via-transparent to-transparent z-40" />

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full pb-16 md:pb-24 z-50 relative">
        {subtitle && (
          <span className="text-[11px] font-semibold text-white uppercase tracking-[0.4em] mb-6 block">
            {subtitle}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-montserrat font-bold text-white mb-8 tracking-tighter leading-[0.9] uppercase">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-white/90 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </SpatialParallax>
  );
};

export default SpatialHero;
