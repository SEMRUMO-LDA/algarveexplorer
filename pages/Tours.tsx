import React from 'react';
import { Link } from 'react-router-dom';
import { TOURS } from '../constants';
import { ChevronRight, ArrowRight, Compass, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';

const Tours: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="bg-[#0d4357] pt-48 pb-24 md:pt-64 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover"
            alt="Scenic mountain landscape"
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('tours.hero.eyebrow')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">{t('tours.hero.eyebrow')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            {t('tours.hero.title')}
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {t('tours.hero.desc')}
          </p>
        </div>
      </section>

      {/* Narrative & Stats */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-10 text-[#0d4357]/40">
              <Compass size={24} className="text-[#da6927]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{t('home.featured.eyebrow')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-montserrat text-[#0d4357] mb-12 tracking-tight uppercase leading-[1.1]">
              {t('home.about.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 mt-24">
            {[
              { label: t('tours.stats.adventures'), value: "150+" },
              { label: t('tours.stats.scouted'), value: "2,400km" },
              { label: t('tours.stats.explorers'), value: "5,000+" },
              { label: t('tours.stats.est'), value: "2016" }
            ].map((stat, i) => (
              <div key={i} className="border-l border-slate-100 pl-8">
                <span className="text-[#da6927] font-bold text-3xl md:text-4xl font-montserrat block mb-2">{stat.value}</span>
                <span className="text-[#0d4357]/40 text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="pb-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURS.map((tour) => (
              <Link
                key={tour.id}
                to={`/tours/${tour.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={tour.image}
                    alt={language === 'pt' ? tour.title_pt : tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-8 left-8">
                    <span className="bg-[#0d4357] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      {language === 'pt' ? tour.difficulty_pt : tour.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest mb-4 block">
                    {language === 'pt' ? tour.duration_pt : tour.duration}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0d4357] mb-6 font-montserrat uppercase tracking-tight leading-none group-hover:text-[#da6927] transition-colors">
                    {language === 'pt' ? tour.title_pt : tour.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-[#0d4357]/40 text-sm font-light italic">
                      {language === 'pt' ? 'A partir de' : 'Starting from'} €{tour.price}
                    </span>
                    <div className="flex items-center space-x-2 text-[#0d4357] group-hover:text-[#da6927] transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-widest">{language === 'pt' ? 'Explorar' : 'Explore'}</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default Tours;