'use client';

import { useEffect } from 'react';

/**
 * Mirror the URL locale into the `kiban-lang` cookie. Two consumers still
 * read that cookie: the KIBAN widgets we keep loaded (cookie notice,
 * accessibility) and a handful of client-side `kibanFetch` calls that
 * haven't been migrated to pass the locale explicitly. Keeping the cookie
 * in sync means those code paths transparently honour the URL locale.
 */
export default function LocaleCookieSync({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const current = document.cookie.match(/(?:^|;\s*)kiban-lang=([^;]+)/)?.[1];
    if (current === locale) return;
    document.cookie = `kiban-lang=${encodeURIComponent(locale)};path=/;max-age=31536000;SameSite=Lax`;
  }, [locale]);
  return null;
}
