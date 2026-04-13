'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnifiedHeroProps {
  videoSrc?: string;
  posterImage: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description: string;
  variant?: 'default' | 'fullscreen';
  overlayOpacity?: number;
}

const UnifiedHero: React.FC<UnifiedHeroProps> = ({
  videoSrc,
  posterImage,
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  description,
  variant = 'default',
  overlayOpacity = 0.7,
}) => {
  const heightClass = variant === 'fullscreen'
    ? 'min-h-[90vh] md:min-h-[95vh] lg:min-h-screen'
    : 'min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]';

  const paddingClass = variant === 'fullscreen'
    ? 'pb-20 md:pb-24 lg:pb-32'
    : 'pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32';

  return (
    <section className={`relative ${heightClass} flex flex-col justify-end overflow-hidden bg-white`}>
      {/* Background Media */}
      <div className="absolute inset-0 pointer-events-none">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster={posterImage}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={posterImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className={`max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full ${paddingClass}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      >
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 mb-6 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 drop-shadow-lg">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-white/50">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-[#da6927] border border-[#da6927]/60 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Plus size={14} />
            <span>{eyebrow}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-montserrat text-white leading-[1.05] tracking-tight uppercase max-w-5xl mb-6 drop-shadow-xl">
          {title}
          {subtitle && (
            <>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl">{subtitle}</span>
            </>
          )}
        </h1>

        {/* Description */}
        <p className="text-white/90 max-w-2xl text-base md:text-lg lg:text-xl font-light leading-relaxed drop-shadow-md">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default UnifiedHero;