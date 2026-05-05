import type { Metadata } from 'next';
import TourDetail from '@/pages_src/TourDetail';
import { tours as kibanTours, imageUrl } from '@/services/kiban';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://algarveexplorertours.com').replace(/\/$/, '');

// Pre-render the tours that exist at build time for SEO + first paint speed.
// Tours added in KIBAN later are SSR'd on first request (Next.js default
// dynamicParams behavior), so a rebuild isn't required to make them routable.
export async function generateStaticParams() {
  const { data } = await kibanTours.list();
  return (data || []).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: tour } = await kibanTours.getBySlug(slug);
  if (!tour) return {};

  const description = tour.short_description || tour.subtitle || tour.full_description?.slice(0, 160);
  const cover = tour.cover_image ? imageUrl(tour.cover_image) : undefined;
  const url = `${SITE_URL}/tours/${tour.slug}`;

  return {
    title: `${tour.title} | Algarve Explorer Tours`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: tour.title,
      description,
      url,
      type: 'website',
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

export default function TourDetailPage() { return <TourDetail />; }
