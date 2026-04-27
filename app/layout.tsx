import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KibanWidgets from '@/components/KibanWidgets';
import KibanSeo, { fetchKibanSeo } from '@/components/KibanSeo';

// Hard-coded fallback used when kibanCMS hasn't been reached yet (build time
// or first cold render). Once the SEO add-on returns settings, generateMetadata
// below replaces these values with the CMS-managed copy.
const FALLBACK: Metadata = {
  title: 'Algarve Explorer Tours',
  description:
    'Premium trail adventures and nature discoveries in the heart of Portugal. Expert regional guides and unforgettable coastal secrets.',
  icons: { icon: '/favicon.png' },
};

/**
 * Pull meta tags + social cards from kibanCMS. Next.js renders the result
 * server-side into <head>, so search engines and social previews see the
 * CMS-managed copy. ISR caches the fetch for 60 seconds.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchKibanSeo();
  if (!seo || !seo.enabled) return FALLBACK;

  const verifications: Record<string, string> = {};
  if (seo.verifications.google) verifications.google = seo.verifications.google;
  if (seo.verifications.bing) verifications['msvalidate.01'] = seo.verifications.bing;

  return {
    title: seo.meta.title || FALLBACK.title!,
    description: seo.meta.description || FALLBACK.description!,
    icons: { icon: seo.meta.favicon_url || '/favicon.png' },
    alternates: seo.meta.canonical_url ? { canonical: seo.meta.canonical_url } : undefined,
    robots: seo.indexing.noindex_default ? 'noindex, nofollow' : undefined,
    openGraph: {
      title: seo.og.title || seo.meta.title || FALLBACK.title!,
      description: seo.og.description || seo.meta.description || FALLBACK.description!,
      images: seo.og.image ? [seo.og.image] : undefined,
      type: (seo.og.type as any) || 'website',
    },
    twitter: {
      card: (seo.twitter.card as any) || 'summary_large_image',
      title: seo.og.title || seo.meta.title,
      description: seo.og.description || seo.meta.description,
      images: seo.og.image ? [seo.og.image] : undefined,
      site: seo.twitter.handle,
    },
    verification: Object.keys(verifications).length > 0 ? verifications : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <KibanWidgets />
            {/* SEO scripts (GA, GTM, Pixel, JSON-LD, custom code) — async server component */}
            <KibanSeo />
          </div>
        </Providers>
      </body>
    </html>
  );
}
