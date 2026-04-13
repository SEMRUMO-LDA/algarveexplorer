'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { useSensoryTheme } from '@/lib/SensoryContext';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const CookieNotice: React.FC = () => {
  const { t } = useLanguage();
  const { vibrate } = useSensoryTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    vibrate(25); // Feedback tactil mais firme para confirmação
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 z-[9999] max-w-[500px] md:left-auto md:right-8"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="bg-brand-orange/20 p-3 rounded-2xl shrink-0">
                <Cookie className="text-brand-orange" size={24} />
              </div>
              <div className="flex-grow">
                <h4 className="text-white font-montserrat font-bold text-[11px] uppercase tracking-[0.2em] mb-2">
                  {t('cookie.title')}
                </h4>
                <p className="text-white/70 text-[13px] leading-relaxed font-light">
                   {t('cookie.message')}
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/20 hover:text-white transition-colors pt-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-1">
              <button
                onClick={handleAccept}
                className="bg-brand-orange text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-lg shadow-brand-orange/20"
              >
                {t('cookie.accept')}
              </button>
              <Link
                href="/privacy"
                onClick={() => setIsVisible(false)}
                className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors border-b border-white/10 pb-0.5"
              >
                {t('cookie.more')}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
