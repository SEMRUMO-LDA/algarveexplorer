'use client';

import Script from 'next/script';

const KIBAN_URL = process.env.NEXT_PUBLIC_KIBAN_URL || '';
const KIBAN_API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY || '';
const KIBAN_TENANT = process.env.NEXT_PUBLIC_KIBAN_TENANT || 'algarveexplorer';

/**
 * KIBAN CMS Widgets — Cookie Notice + Accessibility + i18n
 * Loaded as external scripts from the KIBAN API.
 * Config is managed in the KIBAN admin panel.
 */
export default function KibanWidgets() {
  if (!KIBAN_URL || !KIBAN_API_KEY) return null;

  return (
    <>
      {/* Cookie Notice — GDPR compliant banner */}
      <Script
        src={`${KIBAN_URL}/api/v1/cookie-notice/widget.js`}
        data-api-key={KIBAN_API_KEY}
        data-tenant={KIBAN_TENANT}
        strategy="afterInteractive"
      />

      {/* Accessibility — EAA 2025 compliant widget */}
      <Script
        src={`${KIBAN_URL}/api/v1/accessibility/widget.js`}
        data-api-key={KIBAN_API_KEY}
        data-tenant={KIBAN_TENANT}
        strategy="afterInteractive"
      />

      {/* i18n — Auto-translation (language switcher hidden, controlled by Navbar) */}
      <Script
        src={`${KIBAN_URL}/api/v1/i18n/widget.js`}
        data-api-key={KIBAN_API_KEY}
        data-tenant={KIBAN_TENANT}
        data-style="hidden"
        strategy="afterInteractive"
      />

      {/* Hide the KIBAN i18n widget's own language switcher — we use the Navbar's PT/EN toggle */}
      <style jsx global>{`
        #kiban-i18n-widget { display: none !important; }
      `}</style>
    </>
  );
}
