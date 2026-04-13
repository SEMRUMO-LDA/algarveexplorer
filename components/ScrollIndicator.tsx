'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
  labelPt: string;
}

interface ScrollIndicatorProps {
  sections: Section[];
  language?: 'en' | 'pt';
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ sections, language = 'en' }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);

      // Check if we're past the hero section
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        setShowIndicator(heroRect.bottom < window.innerHeight * 0.5);
      }

      // Determine active section
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!showIndicator) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-4"
      >
        {/* Progress Line */}
        <div className="relative w-[2px] h-48 bg-[#da6927]/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#da6927] rounded-full"
            style={{ height: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Section Dots */}
        <div className="flex flex-col items-center space-y-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center justify-center focus:outline-none"
                aria-label={`Navigate to ${language === 'pt' ? section.labelPt : section.label}`}
              >
                {/* Dot */}
                <div
                  className={`relative transition-all duration-500 rounded-full ${
                    isActive ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5 group-hover:scale-110'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all duration-500 ${
                      isActive ? 'bg-[#da6927]' : 'bg-[#da6927]/25 group-hover:bg-[#da6927]/40'
                    }`}
                  />
                  {/* Pulsing animation on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#da6927]/20"
                      initial={{ scale: 1, opacity: 0.3 }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                {/* Label on hover */}
                <span
                  className={`absolute right-8 whitespace-nowrap px-3 py-1.5 bg-[#0d4357] text-white text-[10px] font-bold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isActive ? 'opacity-100' : ''
                  }`}
                >
                  {language === 'pt' ? section.labelPt : section.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
