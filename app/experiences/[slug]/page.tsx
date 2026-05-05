import ExperienceDetail from '@/pages_src/ExperienceDetail';
import { experiences as kibanExperiences } from '@/services/kiban';

// Mirror the /tours/[slug] strategy: pre-render existing experiences plus a
// `__` catch-all. The server rewrites unknown slugs to it, and the client
// fetches data from KIBAN at runtime.
export async function generateStaticParams() {
  const { data } = await kibanExperiences.list();
  const slugs = (data || []).map((e) => ({ slug: e.slug }));
  return [...slugs, { slug: '__' }];
}

export default function ExperienceDetailPage() { return <ExperienceDetail />; }
