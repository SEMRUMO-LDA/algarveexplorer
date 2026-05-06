import type { Metadata } from 'next';
import Home from '@/pages_src/Home';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'home', path: '/' });
}

export default function HomePage() { return <Home />; }
