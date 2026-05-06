import type { Metadata } from 'next';
import Contacts from '@/pages_src/Contacts';
import { buildPageMetadata } from '@/lib/pageMetadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'contacts', path: '/contacts' });
}

export default function ContactsPage() { return <Contacts />; }
