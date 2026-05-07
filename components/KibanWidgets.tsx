'use client';

import Script from 'next/script';

const KIBAN_URL = process.env.NEXT_PUBLIC_KIBAN_API_URL || '';
const KIBAN_API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY || '';
const KIBAN_TENANT = process.env.NEXT_PUBLIC_KIBAN_TENANT || 'algarveexplorer';

/**
 * KIBAN CMS Widgets — universal loader.
 *
 * One script tag injects every add-on widget enabled for this tenant
 * (cookie-notice / Silktide, accessibility, whatsapp, ...). New add-ons
 * activated in the KIBAN admin appear automatically with no redeploy.
 *
 * The i18n widget is intentionally skipped server-side: locale routing is
 * driven by next-intl, so the DOM-mutation widget would only cause flashes.
 * The loader still respects whatever the admin enables.
 */
export default function KibanWidgets() {
  if (!KIBAN_URL || !KIBAN_API_KEY) return null;

  return (
    <Script
      src={`${KIBAN_URL}/api/v1/widgets/loader.js`}
      data-api-key={KIBAN_API_KEY}
      data-tenant={KIBAN_TENANT}
      strategy="afterInteractive"
    />
  );
}
