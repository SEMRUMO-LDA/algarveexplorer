import ExperienceDetail from '@/pages_src/ExperienceDetail';
import { experiences as kibanExperiences } from '@/services/kiban';

// Pre-render existing experiences. Anything added later is SSR'd on demand.
export async function generateStaticParams() {
  const { data } = await kibanExperiences.list();
  return (data || []).map((e) => ({ slug: e.slug }));
}

export default function ExperienceDetailPage() { return <ExperienceDetail />; }
