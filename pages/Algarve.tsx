import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, CloudRain, Compass, Trees, Footprints, ArrowRight, Plus, Waves } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';

const Algarve: React.FC = () => {
  const { t } = useLanguage();
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-[#fdfdfb] min-h-screen font-montserrat">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="bg-[#0d4357] pt-48 pb-24 md:pt-64 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            src="/image/the-region-hero.jpg"
            className="w-full h-full object-cover"
            alt="Scenic view of the Algarve region"
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('nav.experience')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">{t('algarve.hero.eyebrow')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            {t('algarve.hero.title')}
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {t('algarve.hero.desc')}
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/image/the-region-img1.jpg"
                  className="w-full h-full object-cover"
                  alt="Exploring the natural beauty of the Algarve"
                />
              </div>
              <div
                ref={parallaxRef}
                className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-white p-4 rounded-2xl shadow-2xl hidden md:block"
                style={{
                  transform: `translate3d(0, ${parallaxOffset}px, 0)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src="/image/the-region-img2.jpg"
                  className="w-full h-full object-cover rounded-xl"
                  alt="Local scenery of Southern Portugal"
                />
              </div>
            </div>
            <div className="lg:pl-20">
              <div className="flex items-center space-x-3 mb-10">
                <Compass className="text-[#da6927]" size={20} />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#0d4357]/40">{t('algarve.why.eyebrow')}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat text-[#0d4357] mb-12 tracking-tight leading-tight uppercase">
                {t('algarve.why.title')}
              </h2>
              <div className="space-y-8 text-[#0d4357]/60 text-lg md:text-xl font-light leading-relaxed">
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

          {/* Seasonal Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {[
              {
                icon: <Trees size={32} />,
                title: t('algarve.seasons.spring.title'),
                subtitle: t('algarve.seasons.spring.subtitle'),
                desc: t('algarve.seasons.spring.desc')
              },
              {
                icon: <Sun size={32} />,
                title: t('algarve.seasons.summer.title'),
                subtitle: t('algarve.seasons.summer.subtitle'),
                desc: t('algarve.seasons.summer.desc')
              },
              {
                icon: <Waves size={32} />,
                title: t('algarve.seasons.autumn.title'),
                subtitle: t('algarve.seasons.autumn.subtitle'),
                desc: t('algarve.seasons.autumn.desc')
              },
              {
                icon: <CloudRain size={32} />,
                title: t('algarve.seasons.winter.title'),
                subtitle: t('algarve.seasons.winter.subtitle'),
                desc: t('algarve.seasons.winter.desc')
              }
            ].map((season, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-50 hover:shadow-xl transition-all group">
                <div className="text-[#da6927] mb-8 group-hover:scale-110 transition-transform origin-left">{season.icon}</div>
                <h3 className="text-xl font-bold font-montserrat text-[#0d4357] mb-2 tracking-tight uppercase">{season.title}</h3>
                <p className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest mb-6">{season.subtitle}</p>
                <p className="text-[#0d4357]/50 text-sm font-light leading-relaxed">{season.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Callout */}
      <section className="pb-40 bg-[#fdfdfb]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="border-t border-slate-100 pt-32">
            <div className="flex items-center space-x-3 mb-16 text-[#0d4357]/30">
              <Footprints size={20} />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{t('algarve.regions.eyebrow')}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  id: "01",
                  name: t('algarve.regions.monchique.title'),
                  desc: t('algarve.regions.monchique.desc'),
                  image: "/image/about-us-1.jpeg"
                },
                {
                  id: "02",
                  name: t('algarve.regions.barrocal.title'),
                  desc: t('algarve.regions.barrocal.desc'),
                  image: "/image/albufeira-hidden-gems-&-horse-riding-tour.jpg"
                },
                {
                  id: "03",
                  name: t('algarve.regions.vicentine.title'),
                  desc: t('algarve.regions.vicentine.desc'),
                  image: "/image/benagil-algar-seco-marinha-&-7-valleys-tour.jpeg"
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
                    <span className="absolute left-0 top-0 text-[#da6927] font-bold text-2xl font-montserrat opacity-20 group-hover:opacity-100 transition-opacity">{reg.id}</span>
                    <h4 className="text-2xl font-bold font-montserrat text-[#0d4357] mb-6 uppercase tracking-tight leading-none">{reg.name}</h4>
                    <p className="text-[#0d4357]/60 font-light leading-relaxed text-lg">{reg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default Algarve;