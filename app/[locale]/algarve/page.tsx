import type { Metadata } from 'next';
import Algarve from '@/pages_src/Algarve';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'algarve', path: '/algarve' });
}

export default function AlgarvePage() { return <Algarve />; }
