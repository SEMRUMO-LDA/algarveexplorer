'use client';

import React, { useCallback, ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { type Locale } from '@/i18n/routing';

type Language = Locale;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

/**
 * Compatibility shim — pre-locale-routing code reads `language` and calls
 * `setLanguage` to mutate a cookie. The new world drives the locale from
 * the URL segment via next-intl, so this hook now just exposes the active
 * locale and routes the user to the localized URL when changing language.
 * Uses next-intl's locale-aware router so the NEXT_LOCALE cookie is updated
 * during navigation (otherwise the middleware would bounce the user back).
 * Provider is a passthrough kept so existing consumers don't need to remove
 * the wrapper.
 */
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

export const useLanguage = (): LanguageContextType => {
  const router = useRouter();
  const pathname = usePathname();
  const language = useLocale() as Language;

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    router.replace(pathname || '/', { locale: lang });
  }, [language, pathname, router]);

  return { language, setLanguage };
};
