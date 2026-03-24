import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, CloudRain, Compass, Trees, Footprints, ArrowRight, ArrowLeft, Plus, Waves, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';
import AnimatedBlob from '../components/AnimatedBlob';
import ParallaxCard from '../components/ParallaxCard';

const Algarve: React.FC = () => {
  const { t } = useLanguage();
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const seasonsSliderRef = useRef<HTMLDivElement>(null);
  const [activeSeason, setActiveSeason] = useState(0);

  const seasons = [
    { icon: <Trees size={32} />, title: t('algarve.seasons.spring.title'), subtitle: t('algarve.seasons.spring.subtitle'), desc: t('algarve.seasons.spring.desc') },
    { icon: <Sun size={32} />, title: t('algarve.seasons.summer.title'), subtitle: t('algarve.seasons.summer.subtitle'), desc: t('algarve.seasons.summer.desc') },
    { icon: <Waves size={32} />, title: t('algarve.seasons.autumn.title'), subtitle: t('algarve.seasons.autumn.subtitle'), desc: t('algarve.seasons.autumn.desc') },
    { icon: <CloudRain size={32} />, title: t('algarve.seasons.winter.title'), subtitle: t('algarve.seasons.winter.subtitle'), desc: t('algarve.seasons.winter.desc') }
  ];

  const handleSeasonsScroll = () => {
    if (seasonsSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = seasonsSliderRef.current;
      const scrollRatio = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      const index = Math.max(0, Math.min(seasons.length - 1, Math.round(scrollRatio * (seasons.length - 1))));
      setActiveSeason(index);
    }
  };

  const scrollSeasons = (direction: 'left' | 'right') => {
    if (seasonsSliderRef.current) {
      const { clientWidth } = seasonsSliderRef.current;
      const move = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
      seasonsSliderRef.current.scrollBy({ left: move, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;

      const rect = parallaxRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only update when image is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Subtle move: 0.1 speed
        const offset = (rect.top - windowHeight / 2) * 0.1;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#fffbf9] min-h-screen">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            poster="/image/the-region-hero.jpg"
          >
            <source src="/video/algarvexplorer-video-hero.mp4" type="video/mp4" />
          </video>
          {/* Scrim Overlay - Editorial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('nav.experience')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">{t('algarve.hero.eyebrow')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            {t('algarve.hero.title1')}<br />{t('algarve.hero.title2')}
          </h1>
          <p className="font-sans text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-12">
            {t('algarve.hero.desc')}
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="pt-24 md:pt-40 pb-12 md:pb-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <ParallaxCard
                src="/image/the-region-img1.jpg"
                alt="Exploring the natural beauty of the Algarve"
                className="aspect-[4/5] overflow-hidden rounded-2xl"
                depth={0.3}
              />
              <ParallaxCard
                src="/image/the-region-img2.jpg"
                alt="Local scenery of Southern Portugal"
                className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-2/3 aspect-square border-2 border-white rounded-2xl shadow-2xl overflow-hidden"
                depth={0.7}
              />
            </div>
            <div className="lg:pl-20">
              <div className="flex items-center mb-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#da6927]">{t('algarve.why.eyebrow')}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat text-brand-navy mb-12 tracking-tight leading-tight uppercase">
                {t('algarve.why.title')}
              </h2>
              <div className="space-y-8 text-brand-body/90 text-lg md:text-xl font-light leading-relaxed">
                <p>{t('algarve.why.p1')}</p>
                <p>{t('algarve.why.p2')}</p>
              </div>
              <Link
                to="/tours"
                className="mt-16 inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#da6927] transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                <span>{t('algarve.why.cta')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Callout */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  id: "01",
                  name: t('algarve.regions.monchique.title'),
                  desc: t('algarve.regions.monchique.desc'),
                  image: "/image/algarve-monchique.jpeg"
                },
                {
                  id: "02",
                  name: t('algarve.regions.barrocal.title'),
                  desc: t('algarve.regions.barrocal.desc'),
                  image: "/image/algarve-barrocal.jpeg"
                },
                {
                  id: "03",
                  name: t('algarve.regions.vicentine.title'),
                  desc: t('algarve.regions.vicentine.desc'),
                  image: "/image/algarve-costa-vicentina.jpeg"
                }
              ].map((reg, i) => (
                <div key={i} className="group cursor-default">
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-10 shadow-lg bg-slate-100">
                    <img
                      src={reg.image}
                      alt={reg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative pl-12">
                    <span className="absolute left-0 top-0 text-[#da6927] font-bold text-2xl font-montserrat">{reg.id}</span>
                    <h4 className="text-2xl font-bold font-montserrat text-brand-navy mb-6 uppercase tracking-tight leading-none">{reg.name}</h4>
                    <p className="text-brand-body/90 font-light leading-relaxed text-lg">{reg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Insights */}
      <section className="relative py-24 md:py-40 bg-[#fffbf9] overflow-hidden">
        <AnimatedBlob 
          className="top-1/4 -left-24" 
          opacity={0.3} 
          size="w-[700px] h-[700px]"
          duration="45s"
          blendMode="multiply"
        />
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
            <div className="pr-0 lg:pr-12">
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">{t('algarve.seasons.eyebrow')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-brand-navy mb-8 tracking-tight uppercase leading-none">{t('algarve.seasons.title')}</h2>
              <div className="space-y-6 text-brand-body/90 text-lg font-light leading-relaxed mb-16">
                <p>{t('algarve.seasons.p1')}</p>
                <p>{t('algarve.seasons.p2')}</p>
              </div>
              
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex space-x-3">
                  <button onClick={() => scrollSeasons('left')} className="group w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0d4357]/20 flex items-center justify-center hover:bg-[#0d4357] hover:border-[#0d4357] outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <ArrowLeft size={20} strokeWidth={1.5} className="text-brand-navy group-hover:text-white group-hover:-translate-x-1 transition-all duration-500" />
                  </button>
                  <button onClick={() => scrollSeasons('right')} className="group w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0d4357]/20 flex items-center justify-center hover:bg-[#da6927] hover:border-[#da6927] outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <ArrowRight size={20} strokeWidth={1.5} className="text-brand-navy group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                  </button>
                </div>
                
                <div className="flex-1 h-[2px] bg-[#0d4357]/10 relative overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-[#da6927] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-full" style={{ width: `${((activeSeason + 1) / seasons.length) * 100}%` }} />
                </div>
                
                <div className="text-sm font-bold tracking-widest text-brand-navy font-montserrat w-16 text-right">
                  0{activeSeason + 1} <span className="text-brand-body/30">/ 0{seasons.length}</span>
                </div>
              </div>
            </div>

            <div className="relative w-full -mr-6 lg:-mr-12">
              <div
                ref={seasonsSliderRef}
                onScroll={handleSeasonsScroll}
                className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-12 px-6 lg:px-0 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {seasons.map((season, i) => {
                  const isActive = activeSeason === i;
                  return (
                  <div 
                    key={i} 
                    className={`flex-none w-[85%] sm:w-[60%] lg:w-[65%] xl:w-[55%] snap-center p-8 lg:p-12 rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between min-h-[360px]
                      ${isActive ? 'bg-[#0d4357] border-white/10 shadow-[0_20px_40px_-15px_rgba(13,67,87,0.3)] scale-100 opacity-100 translate-y-0' : 'bg-white border-[#0d4357]/10 scale-95 opacity-50 blur-[1px] hover:blur-none hover:opacity-100 translate-y-4'}
                    `}
                  >
                    <div className="mb-12 inline-flex text-[#da6927] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 origin-left">
                      {season.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold font-montserrat mb-4 uppercase tracking-tight transition-colors duration-700 ${isActive ? 'text-white' : 'text-brand-navy'}`}>{season.title}</h3>
                      <p className={`text-sm leading-relaxed font-light transition-colors duration-700 ${isActive ? 'text-white/70' : 'text-brand-body/90'}`}>{season.desc}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
};

export default Algarve;