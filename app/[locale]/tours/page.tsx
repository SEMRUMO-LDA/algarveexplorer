import type { Metadata } from 'next';
import Tours from '@/pages_src/Tours';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'tours', path: '/tours' });
}

export default function ToursPage() { return <Tours />; }
