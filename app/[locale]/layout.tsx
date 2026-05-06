import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import Providers from '../providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KibanWidgets from '@/components/KibanWidgets';
import KibanSeo, { fetchKibanSeo } from '@/components/KibanSeo';
import LocaleCookieSync from '@/components/LocaleCookieSync';
import { routing, type Locale } from '@/i18n/routing';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algarveexplorertours.com').replace(/\/$/, '');

const FALLBACK: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Algarve Explorer Tours',
  description:
    'Premium trail adventures and nature discoveries in the heart of Portugal. Expert regional guides and unforgettable coastal secrets.',
  icons: { icon: '/favicon.png' },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Build locale-aware metadata. Pulls the active language's SEO copy from KIBAN
 * and produces hreflang `<link rel="alternate">` entries so search engines can
 * cross-reference the locale variants. The KIBAN settings stay global for now;
 * once Phase 1 of the new i18n add-on lands the copy itself becomes per-locale.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await fetchKibanSeo();

  const baseFallback: Metadata = { ...FALLBACK };

  // Build hreflang map for every supported locale of this same path (root for now).
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? '/' : `/${l}`;
  }
  languages['x-default'] = '/';

  if (!seo || !seo.enabled) {
    return {
      ...baseFallback,
      alternates: { canonical: locale === routing.defaultLocale ? '/' : `/${locale}`, languages },
    };
  }

  const verifications: Record<string, string> = {};
  if (seo.verifications.google) verifications.google = seo.verifications.google;
  if (seo.verifications.bing) verifications['msvalidate.01'] = seo.verifications.bing;

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.meta.title || baseFallback.title!,
    description: seo.meta.description || baseFallback.description!,
    icons: { icon: seo.meta.favicon_url || '/favicon.png' },
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages,
    },
    robots: seo.indexing.noindex_default ? 'noindex, nofollow' : undefined,
    openGraph: {
      title: seo.og.title || seo.meta.title || baseFallback.title!,
      description: seo.og.description || seo.meta.description || baseFallback.description!,
      images: seo.og.image ? [seo.og.image] : undefined,
      type: (seo.og.type as any) || 'website',
      locale,
    },
    twitter: {
      card: (seo.twitter.card as any) || 'summary_large_image',
      title: seo.og.title || seo.meta.title,
      description: seo.og.description || seo.meta.description,
      images: seo.og.image ? [seo.og.image] : undefined,
      site: seo.twitter.handle,
    },
    verification: Object.keys(verifications).length > 0 ? verifications : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LocaleCookieSync locale={locale} />
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <KibanWidgets />
              <KibanSeo />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
