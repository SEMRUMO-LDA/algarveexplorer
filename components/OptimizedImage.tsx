import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 75
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    const widths = [320, 640, 768, 1024, 1280, 1600];
    return widths
      .map(w => `${src}?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };

  // Generate WebP version
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-inherit" />
      )}

      {isInView && (
        <picture>
          {/* WebP version for modern browsers */}
          <source
            type="image/webp"
            srcSet={generateSrcSet().replace(/\.(jpg|jpeg|png)/gi, '.webp')}
            sizes={sizes}
          />

          {/* Fallback to original format */}
          <source
            srcSet={generateSrcSet()}
            sizes={sizes}
          />

          <img
            src={src}
            alt={alt}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;