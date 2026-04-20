'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=31536000;SameSite=Lax`;
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  // Sync with KIBAN i18n widget cookie on mount
  useEffect(() => {
    const saved = getCookie('kiban-lang') as Language | null;
    if (saved && (saved === 'pt' || saved === 'en')) {
      setLanguageState(saved);
    }

    // Listen for language changes from the KIBAN i18n widget
    const handleLangChange = (e: CustomEvent) => {
      const lang = e.detail?.lang;
      if (lang === 'pt' || lang === 'en') {
        setLanguageState(lang);
      }
    };

    window.addEventListener('kiban-lang-change', handleLangChange as EventListener);
    return () => window.removeEventListener('kiban-lang-change', handleLangChange as EventListener);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);

    // Sync with KIBAN i18n widget
    setCookie('kiban-lang', lang);

    // Notify the KIBAN widget to translate the page
    window.dispatchEvent(new CustomEvent('kiban-lang-change', { detail: { lang } }));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
