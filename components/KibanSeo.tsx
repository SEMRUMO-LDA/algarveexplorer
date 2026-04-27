/**
 * KibanSeo — server-renders SEO + analytics from kibanCMS settings.
 *
 * The kibanCMS SEO add-on stores meta tags, social cards, analytics IDs,
 * structured data, and custom head/body HTML in a `seo-settings` collection.
 * This component fetches those settings once per render and injects them.
 *
 * Used inside `app/layout.tsx`. The component is a server component so meta
 * tags appear in the initial HTML (critical for crawlers + social previews).
 */

import Script from 'next/script';

const KIBAN_URL = process.env.NEXT_PUBLIC_KIBAN_URL || '';
const KIBAN_API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY || '';
const KIBAN_TENANT = process.env.NEXT_PUBLIC_KIBAN_TENANT || 'algarveexplorer';

export interface KibanSeoSettings {
  enabled: boolean;
  meta: { title?: string; description?: string; favicon_url?: string; canonical_url?: string };
  og: { title?: string; description?: string; image?: string; type?: string };
  twitter: { card?: string; handle?: string };
  analytics: {
    google_analytics?: string;
    google_tag_manager?: string;
    facebook_pixel?: string;
  };
  indexing: { robots_txt?: string; noindex_default?: boolean; sitemap_url?: string; hreflang?: string };
  verifications: { google?: string; bing?: string; pinterest?: string };
  structured_data: string;
  custom_head_code: string;
  custom_body_code: string;
}

export async function fetchKibanSeo(): Promise<KibanSeoSettings | null> {
  if (!KIBAN_URL || !KIBAN_API_KEY) return null;

  try {
    const res = await fetch(`${KIBAN_URL}/api/v1/seo`, {
      headers: {
        Authorization: `Bearer ${KIBAN_API_KEY}`,
        'X-Tenant': KIBAN_TENANT,
      },
      next: { revalidate: 60 }, // ISR: refresh once per minute, no flood under traffic
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data as KibanSeoSettings) || null;
  } catch {
    return null;
  }
}

/**
 * Renders analytics scripts, structured data, and custom HTML from kibanCMS.
 * Meta tags + social cards are handled by Next.js metadata API (see
 * `generateMetadata` in layout.tsx) — those go into <head> via Next.
 */
export default async function KibanSeo() {
  const seo = await fetchKibanSeo();
  if (!seo || !seo.enabled) return null;

  return (
    <>
      {/* Google Tag Manager — loads first; ID like "GTM-XXXXXXX" */}
      {seo.analytics.google_tag_manager && (
        <Script id="kiban-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${seo.analytics.google_tag_manager}');`}
        </Script>
      )}

      {/* Google Analytics 4 (gtag); ID like "G-XXXXXXXXXX" */}
      {seo.analytics.google_analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${seo.analytics.google_analytics}`}
            strategy="afterInteractive"
          />
          <Script id="kiban-ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seo.analytics.google_analytics}');`}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {seo.analytics.facebook_pixel && (
        <Script id="kiban-fbpixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${seo.analytics.facebook_pixel}');fbq('track','PageView');`}
        </Script>
      )}

      {/* JSON-LD structured data */}
      {seo.structured_data && (
        <Script
          id="kiban-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: seo.structured_data }}
        />
      )}

      {/* Custom HEAD code — escape hatch for arbitrary tags */}
      {seo.custom_head_code && (
        <Script
          id="kiban-custom-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: seo.custom_head_code }}
        />
      )}

      {/* Custom BODY code — chat widgets, tracking pixels, etc. */}
      {seo.custom_body_code && (
        <Script
          id="kiban-custom-body"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: seo.custom_body_code }}
        />
      )}
    </>
  );
}
