import TourDetail from '@/pages_src/TourDetail';
import { tours as kibanTours } from '@/services/kiban';

// Pre-render the tours that exist at build time for SEO + first paint speed.
// Tours added in KIBAN later are SSR'd on first request (Next.js default
// dynamicParams behavior), so a rebuild isn't required to make them routable.
export async function generateStaticParams() {
  const { data } = await kibanTours.list();
  return (data || []).map((t) => ({ slug: t.slug }));
}

export default function TourDetailPage() { return <TourDetail />; }
