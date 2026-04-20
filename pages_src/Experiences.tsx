'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { experiences as kibanExperiences, ExperienceEntry } from '@/services/kiban';
import { useLanguage } from '@/lib/LanguageContext';
import { Clock, Users, MapPin, Star, Loader2 } from 'lucide-react';

export default function Experiences() {
  const [experiencesList, setExperiencesList] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'tours' | 'transfers' | 'experiences'>('all');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    setLoading(true);
    try {
      const { data } = await kibanExperiences.list({ active: true });
      setExperiencesList(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiencesList.filter(exp =>
    filter === 'all' || exp.category === filter
  );

  const featuredExperiences = experiencesList.filter(exp => exp.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Experiências no Algarve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            Descobre as melhores experiências e aventuras na costa algarvia
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Todas
          </FilterButton>
          <FilterButton
            active={filter === 'tours'}
            onClick={() => setFilter('tours')}
          >
            Tours
          </FilterButton>
          <FilterButton
            active={filter === 'transfers'}
            onClick={() => setFilter('transfers')}
          >
            Transfers
          </FilterButton>
          <FilterButton
            active={filter === 'experiences'}
            onClick={() => setFilter('experiences')}
          >
            Experiências
          </FilterButton>
        </div>
      </section>

      {/* Featured Experiences */}
      {featuredExperiences.length > 0 && filter === 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            Em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* All Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-400">
              Nenhuma experiência encontrada
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-8">
              Todas as Experiências
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences
                .filter(exp => !exp.featured || filter !== 'all')
                .map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} featured={false} />
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// Sub-components
function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-semibold transition-all ${
        active
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function ExperienceCard({
  experience,
  featured = false
}: {
  experience: ExperienceEntry;
  featured?: boolean;
}) {
  const { language } = useLanguage();
  const title = language === 'pt' ? experience.title_pt : experience.title_en;
  const description = language === 'pt'
    ? experience.short_description_pt || experience.description_pt
    : experience.short_description_en || experience.description_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/experiences/${experience.slug}`}>
        <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all transform hover:scale-[1.02]">
          {/* Image */}
          {experience.cover_image && (
            <div className="relative h-64 overflow-hidden">
              <img
                src={experience.cover_image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white" />
                  Destaque
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 uppercase">
                {experience.category}
              </span>
              {experience.price && (
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-semibold text-green-400">
                  €{experience.price}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
              {title}
            </h3>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
              {description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              {experience.duration_minutes && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {experience.duration_minutes < 60
                    ? `${experience.duration_minutes} min`
                    : `${Math.floor(experience.duration_minutes / 60)}h${experience.duration_minutes % 60 ? ` ${experience.duration_minutes % 60}min` : ''}`
                  }
                </div>
              )}
              {experience.max_participants && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Até {experience.max_participants}
                </div>
              )}
              {experience.meeting_point_pt && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {language === 'pt' ? experience.meeting_point_pt : experience.meeting_point_en}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
