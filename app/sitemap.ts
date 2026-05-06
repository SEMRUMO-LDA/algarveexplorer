import type { MetadataRoute } from 'next';
import { tours as kibanTours } from '@/services/kiban';
import { routing } from '@/i18n/routing';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algarveexplorertours.com').replace(/\/$/, '');

// Refresh hourly so newly published tours appear without a redeploy.
export const revalidate = 3600;

const STATIC_PATHS: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/tours', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/transfers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/algarve', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contacts', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
];

/**
 * Build the URL for a path in a given locale. Default locale stays at the
 * root (no prefix) so existing SEO is preserved; other locales are prefixed.
 */
function localizedUrl(path: string, locale: string): string {
  const cleaned = path === '/' ? '' : path;
  if (locale === routing.defaultLocale) {
    return `${SITE_URL}${cleaned || '/'}`;
  }
  return `${SITE_URL}/${locale}${cleaned}`;
}

/**
 * Build the `alternates.languages` map for a path so the sitemap emits
 * `<xhtml:link rel="alternate" hreflang>` entries — search engines use these
 * to understand the locale graph and serve the right variant per market.
 */
function alternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of routing.locales) out[l] = localizedUrl(path, l);
  out['x-default'] = localizedUrl(path, routing.defaultLocale);
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: alternates(path) },
    }))
  );

  const { data: tourList } = await kibanTours.list();
  const tourEntries: MetadataRoute.Sitemap = (tourList || []).flatMap((t) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(`/tours/${t.slug}`, locale),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
      alternates: { languages: alternates(`/tours/${t.slug}`) },
    }))
  );

  return [...staticEntries, ...tourEntries];
}
