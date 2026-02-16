import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, Compass } from 'lucide-react';
import { TOURS } from '../constants';
import { useLanguage } from '../LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const aboutSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const cardWidth = clientWidth * 0.4;
      const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const paddingLeftBase = "max(1.5rem, calc((100vw - 1600px) / 2 + 1.5rem))";
  const paddingLeftLg = "max(3rem, calc((100vw - 1600px) / 2 + 3rem))";

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/video/algarvexplorer-video-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full z-10">
          <div className="max-w-4xl">
            <span className="text-[11px] font-semibold text-white uppercase tracking-[0.4em] mb-6 block">{t('home.hero.eyebrow')}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white leading-[1.1] tracking-tight mb-10">
              {t('home.hero.title')}
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl">
              {t('home.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/tours"
                className="bg-[#da6927] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0d4357] transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                {t('home.hero.exploreBtn')}
              </Link>
              <Link
                to="/algarve"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                {t('home.hero.regionBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Adventures Section */}
      <section id="experiences" className="py-24 md:py-32 bg-[#fdfdfb] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-2xl">
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">{t('home.featured.eyebrow')}</span>
              <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-[#0d4357] tracking-tight mb-6 uppercase">
                {t('home.featured.title')}
              </h2>
              <p className="text-[#0d4357]/40 text-lg md:text-xl font-light leading-relaxed">
                {t('home.featured.desc')}
              </p>
            </div>
            <div className="flex space-x-3 pb-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#0d4357]/10 flex items-center justify-center text-[#0d4357] hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all duration-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#0d4357]/10 flex items-center justify-center text-[#0d4357] hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all duration-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-10 no-scrollbar snap-x snap-mandatory pb-12 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: `var(--container-pl, ${paddingLeftBase})`,
            paddingRight: '3rem',
            scrollPaddingLeft: `var(--container-pl, ${paddingLeftBase})`
          }}
        >
          <style>{`
            div[ref] { --container-pl: ${paddingLeftBase}; }
            @media (min-width: 1024px) {
              div[ref] { --container-pl: ${paddingLeftLg}; }
            }
          `}</style>

          {TOURS.map((tour) => (
            <div key={tour.id} className="flex-none w-[80vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] snap-start group">
              <Link to={`/tours/${tour.slug}`} className="block">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-8 relative">
                  <img
                    src={tour.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    alt={`Scenic view from ${tour.title}`}
                  />
                  <div className="absolute top-6 left-6 bg-white/95 px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-[10px] font-bold text-[#0d4357] uppercase tracking-widest">{tour.duration}</span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center space-x-2 text-[#da6927] mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{tour.difficulty}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-[#0d4357] mb-4 group-hover:text-[#da6927] transition-colors tracking-tight leading-tight uppercase">
                    {tour.title}
                  </h3>
                  <div className="flex items-center text-[#0d4357]/40 text-sm">
                    <span className="font-semibold">{language === 'pt' ? 'Desde' : 'From'} €{tour.price}</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform text-[#da6927]" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutSectionRef} className="relative flex flex-col lg:flex-row bg-white border-t border-slate-50">
        <div className="w-full lg:w-1/2 px-6 lg:pl-12 lg:pr-6 py-32 md:py-48 lg:py-64 flex gap-4 lg:gap-8">
          <div className="flex-1 space-y-12 lg:space-y-32">
            <div
              className={`aspect-[3/4] overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '0ms' }}
            >
              <img
                src="https://images.unsplash.com/photo-1551632432-c7360b7f0187?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Hiker overlooking a mountain trail"
              />
            </div>
            <div
              className={`aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Dramatic coastal cliffs meeting the Atlantic Ocean"
              />
            </div>
          </div>
          <div className="flex-1 space-y-12 lg:space-y-32 pt-32 lg:pt-64">
            <div
              className={`aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <img
                src="https://images.unsplash.com/photo-1520110120385-ad28c7790c7f?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Charming traditional Portuguese village street"
              />
            </div>
            <div
              className={`aspect-[3/4] overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <img
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Horseback riding adventure through the Algarve countryside"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex items-center justify-start bg-[#fdfdfb] lg:bg-transparent">
          <div className="max-w-2xl px-6 lg:pl-24 lg:pr-10 py-24 md:py-32">
            <div className="inline-flex items-center space-x-3 mb-8 text-[#da6927]">
              <Compass size={24} />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#0d4357]/40">{t('home.about.eyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-[#0d4357] leading-[1.1] tracking-tight mb-10 uppercase">
              {t('home.about.title')}
            </h2>
            <div className="space-y-8 text-[#0d4357]/60 text-lg md:text-xl font-light leading-relaxed mb-12">
              <p>{t('home.about.p1')}</p>
              <p>{t('home.about.p2')}</p>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#0d4357] font-montserrat tracking-tight">300+</p>
                <p className="text-[#0d4357]/30 text-[10px] font-bold uppercase tracking-widest mt-2">{t('home.about.spots')}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#0d4357] font-montserrat tracking-tight">8yrs</p>
                <p className="text-[#0d4357]/30 text-[10px] font-bold uppercase tracking-widest mt-2">{t('home.about.expertise')}</p>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#da6927] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
            >
              <span>{t('home.about.philosophy')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 md:py-40 bg-[#0d4357] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">{t('home.cta.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-10 tracking-tight uppercase">{t('home.cta.title')}</h2>
          <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('home.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/tours"
              className="bg-[#da6927] text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0d4357] transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
            >
              {t('home.cta.browse')}
            </Link>
            <Link
              to="/contacts"
              className="bg-transparent border border-white/20 text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
            >
              {t('home.cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;