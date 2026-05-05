import type { MetadataRoute } from 'next';
import { tours as kibanTours } from '@/services/kiban';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algarveexplorertours.com').replace(/\/$/, '');

// Refresh hourly so newly published tours appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/tours`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/transfers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/algarve`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contacts`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const { data: tourList } = await kibanTours.list();
  const tourRoutes: MetadataRoute.Sitemap = (tourList || []).map((t) => ({
    url: `${SITE_URL}/tours/${t.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...tourRoutes];
}
