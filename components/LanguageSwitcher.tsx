'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const KIBAN_URL = process.env.NEXT_PUBLIC_KIBAN_URL || '';
const KIBAN_API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY || '';
const KIBAN_TENANT = process.env.NEXT_PUBLIC_KIBAN_TENANT || 'algarveexplorer';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=31536000;SameSite=Lax`;
}

/**
 * Language switcher that drives the KIBAN i18n widget via its cookie
 * (`kiban-lang`) + event (`kiban-lang-change`) contract. Visually lives
 * in the Navbar next to the CTA — the floating KIBAN widget stays
 * hidden via CSS so there's only one entry point.
 */
export default function LanguageSwitcher({
  isTransparent = false,
}: {
  isTransparent?: boolean;
}) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [current, setCurrent] = useState('pt');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch available languages from KIBAN
  useEffect(() => {
    if (!KIBAN_URL || !KIBAN_API_KEY) return;
    fetch(`${KIBAN_URL}/api/v1/i18n/languages`, {
      headers: {
        Authorization: `Bearer ${KIBAN_API_KEY}`,
        'X-Tenant': KIBAN_TENANT,
      },
    })
      .then((r) => r.json())
      .then((json) => {
        const data = json.data || json;
        if (data?.available) setLanguages(data.available);
        if (data?.default) {
          const saved = getCookie('kiban-lang');
          setCurrent(saved || data.default);
        }
      })
      .catch((err) => console.error('Failed to load languages:', err));
  }, []);

  // Sync with widget language changes (from elsewhere)
  useEffect(() => {
    const handler = (e: Event) => {
      const lang = (e as CustomEvent).detail?.lang;
      if (lang) setCurrent(lang);
    };
    window.addEventListener('kiban-lang-change', handler);
    return () => window.removeEventListener('kiban-lang-change', handler);
  }, []);

  // Close dropdown on outside click
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

  const changeLanguage = (code: string) => {
    setCurrent(code);
    setOpen(false);
    setCookie('kiban-lang', code);
    window.dispatchEvent(new CustomEvent('kiban-lang-change', { detail: { lang: code } }));
  };

  if (languages.length <= 1) return null;

  const activeLabel = languages.find((l) => l.code === current)?.code?.toUpperCase() || current.toUpperCase();

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
          {languages.map((lang) => {
            const active = lang.code === current;
            return (
              <li key={lang.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-3 ${
                    active
                      ? 'bg-[#0d4357] text-white'
                      : 'text-[#0d4357] hover:bg-slate-50'
                  }`}
                >
                  <span>{lang.code.toUpperCase()}</span>
                  <span className={`normal-case tracking-normal font-medium ${active ? 'text-white/80' : 'text-brand-body/60'}`}>
                    {lang.name}
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
