import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algarveexplorertours.com').replace(/\/$/, '');

/**
 * Build per-page metadata for a static route. The `namespace` points to a
 * messages bundle that exposes `seo.title` and `seo.description`; the path
 * is used to compute the canonical URL and the hreflang `<link rel=alternate>`
 * map for every supported locale. Pages with dynamic data (e.g. tours/[slug])
 * still build their own metadata directly because they need access to the
 * fetched record.
 */
export async function buildPageMetadata({
  locale,
  namespace,
  path,
}: {
  locale: Locale;
  namespace: string;
  path: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `${namespace}.seo` });

  const localizedPath = (l: Locale) =>
    l === routing.defaultLocale ? path : `/${l}${path === '/' ? '' : path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedPath(l);
  languages['x-default'] = localizedPath(routing.defaultLocale);

  const url = `${SITE_URL}${localizedPath(locale)}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}
