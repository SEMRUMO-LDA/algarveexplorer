import type { Metadata } from 'next';
import Privacy from '@/pages_src/Privacy';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'privacy', path: '/privacy' });
}

export default function PrivacyPage() { return <Privacy />; }
