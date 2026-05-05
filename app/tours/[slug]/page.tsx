import TourDetail from '@/pages_src/TourDetail';
import { tours as kibanTours } from '@/services/kiban';

// Pre-render the tours that exist at build time (good SEO, fast first paint),
// plus a `__` catch-all the server rewrites unknown slugs to. The client
// component reads the URL slug and fetches fresh data from KIBAN, so tours
// added/removed between builds work without a redeploy.
export async function generateStaticParams() {
  const { data } = await kibanTours.list();
  const slugs = (data || []).map((t) => ({ slug: t.slug }));
  return [...slugs, { slug: '__' }];
}

export default function TourDetailPage() { return <TourDetail />; }
