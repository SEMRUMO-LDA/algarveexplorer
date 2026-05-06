import type { Metadata } from 'next';
import TourDetail from '@/pages_src/TourDetail';
import { tours as kibanTours, imageUrl } from '@/services/kiban';
import { routing, type Locale } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algarveexplorertours.com').replace(/\/$/, '');

/**
 * Pre-render every tour for every supported locale at build time so search
 * engines crawl /tours/{slug} (PT) and /en/tours/{slug} (EN) immediately.
 * Tours added in KIBAN later get SSR'd on first request via dynamicParams.
 */
export async function generateStaticParams() {
  const { data } = await kibanTours.list();
  const slugs = (data || []).map((t) => t.slug);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

function localizedUrl(path: string, locale: Locale): string {
  return locale === routing.defaultLocale ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: tour } = await kibanTours.getBySlug(slug, { lang: locale });
  if (!tour) return {};

  const description = tour.short_description || tour.subtitle || tour.full_description?.slice(0, 160);
  const cover = tour.cover_image ? imageUrl(tour.cover_image) : undefined;
  const path = `/tours/${tour.slug}`;
  const url = localizedUrl(path, locale);

  // Hreflang map covering each locale variant of this tour
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(path, l);
  languages['x-default'] = localizedUrl(path, routing.defaultLocale);

  return {
    title: `${tour.title} | Algarve Explorer Tours`,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: tour.title,
      description,
      url,
      type: 'website',
      locale,
      images: cover ? [cover] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TourDetail />;
}
