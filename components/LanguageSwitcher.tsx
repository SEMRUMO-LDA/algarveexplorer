'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';

const LABELS: Record<Locale, { code: string; name: string }> = {
  pt: { code: 'PT', name: 'Português' },
  en: { code: 'EN', name: 'English' },
};

/**
 * Strip the leading locale segment from a pathname so it can be re-prefixed
 * for another locale. `/en/tours/x` → `/tours/x`. Default-locale paths are
 * un-prefixed, so we leave them as-is.
 */
function stripLocale(pathname: string): string {
  for (const l of routing.locales) {
    if (l === routing.defaultLocale) continue;
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || '/';
}

function localeHref(pathname: string, locale: Locale): string {
  const clean = stripLocale(pathname);
  if (locale === routing.defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Locale switcher driven by the URL segment. On selection it does a hard
 * `router.push()` to the localized path so the server re-renders the page
 * in the new locale (no client DOM mutation). Dropdown styling matches the
 * Navbar's transparent/solid states.
 */
export default function LanguageSwitcher({
  isTransparent = false,
}: {
  isTransparent?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const switchTo = (code: Locale) => {
    setOpen(false);
    if (code === current) return;
    router.push(localeHref(pathname || '/', code));
  };

  if (routing.locales.length <= 1) return null;

  const activeLabel = LABELS[current]?.code || current.toUpperCase();

  const btnClass = `inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2.5 sm:px-5 sm:py-3 rounded-full transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 ${
    isTransparent
      ? 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-[#0d4357]'
      : 'bg-white border-slate-200 text-[#0d4357] hover:bg-slate-50'
  }`;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={btnClass}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={14} />
        <span>{activeLabel}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] min-w-[140px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[110]"
        >
          {routing.locales.map((code) => {
            const active = code === current;
            const meta = LABELS[code];
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchTo(code)}
                  className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-3 ${
                    active ? 'bg-[#0d4357] text-white' : 'text-[#0d4357] hover:bg-slate-50'
                  }`}
                >
                  <span>{meta.code}</span>
                  <span className={`normal-case tracking-normal font-medium ${active ? 'text-white/80' : 'text-brand-body/60'}`}>
                    {meta.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
