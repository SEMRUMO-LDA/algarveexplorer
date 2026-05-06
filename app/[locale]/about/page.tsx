import type { Metadata } from 'next';
import About from '@/pages_src/About';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'about', path: '/about' });
}

export default function AboutPage() { return <About />; }
