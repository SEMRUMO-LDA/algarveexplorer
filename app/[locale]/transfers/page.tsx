import type { Metadata } from 'next';
import Transfers from '@/pages_src/Transfers';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'transfers', path: '/transfers' });
}

export default function TransfersPage() { return <Transfers />; }
