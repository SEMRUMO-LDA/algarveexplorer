'use client';

import React, { useCallback, ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';

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
 * Provider is a passthrough kept so existing consumers don't need to remove
 * the wrapper.
 */
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

function stripLocale(pathname: string): string {
  for (const l of routing.locales) {
    if (l === routing.defaultLocale) continue;
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || '/';
}

export const useLanguage = (): LanguageContextType => {
  const router = useRouter();
  const pathname = usePathname();
  const language = useLocale() as Language;

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    const clean = stripLocale(pathname || '/');
    const target = lang === routing.defaultLocale ? clean : clean === '/' ? `/${lang}` : `/${lang}${clean}`;
    router.push(target);
  }, [language, pathname, router]);

  return { language, setLanguage };
};
