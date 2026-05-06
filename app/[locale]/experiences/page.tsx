import type { Metadata } from 'next';
import Experiences from '@/pages_src/Experiences';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'experiences', path: '/experiences' });
}

export default function ExperiencesPage() { return <Experiences />; }
