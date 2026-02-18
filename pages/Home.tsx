import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, Compass } from 'lucide-react';
import { TOURS } from '../constants';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';

const RevealingImage: React.FC<{ src: string; alt: string; className: string; delay?: number }> = ({ src, alt, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-20% 0px -20% 0px' // Triggers closer to the middle
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={src}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        alt={alt}
      />
    </div>
  );
};

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const cardWidth = clientWidth * (window.innerWidth < 768 ? 0.8 : 0.3);
      const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const paddingLeftBase = "max(1.5rem, calc((100vw - 1600px) / 2 + 1.5rem))";
  const paddingLeftLg = "max(3rem, calc((100vw - 1600px) / 2 + 3rem))";

  return (
    <div className="flex flex-col bg-[#fdfdfb]">
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
          className="flex overflow-x-auto gap-8 no-scrollbar snap-x snap-mandatory pb-12 cursor-grab active:cursor-grabbing"
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
              <Link
                to={`/tours/${tour.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 h-full"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={tour.image}
                    alt={language === 'pt' ? tour.title_pt : tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#0d4357] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      {language === 'pt' ? tour.difficulty_pt : tour.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest mb-4 block">
                    {language === 'pt' ? tour.duration_pt : tour.duration}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#0d4357] mb-6 font-montserrat uppercase tracking-tight leading-tight group-hover:text-[#da6927] transition-colors h-14 line-clamp-2">
                    {language === 'pt' ? tour.title_pt : tour.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-[#0d4357]/40 text-xs font-light italic">
                      {language === 'pt' ? 'A partir de' : 'Starting from'} €{tour.price}
                    </span>
                    <div className="flex items-center space-x-2 text-[#0d4357] group-hover:text-[#da6927] transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-widest">{language === 'pt' ? 'Explorar' : 'Explore'}</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative flex flex-col lg:flex-row bg-[#fdfdfb]">
        <div className="w-full lg:w-1/2 px-6 lg:pl-12 lg:pr-6 py-32 md:py-48 lg:py-64 flex gap-4 lg:gap-8 border-t border-slate-50">
          <div className="flex-1 space-y-12 lg:space-y-32">
            <RevealingImage
              src="/image/about-us-1.jpeg"
              alt="Hiker overlooking a mountain trail"
              className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl"
              delay={0}
            />
            <RevealingImage
              src="/image/about-us-2.jpeg"
              alt="Dramatic coastal cliffs meeting the Atlantic Ocean"
              className="aspect-square overflow-hidden rounded-2xl shadow-xl"
              delay={200}
            />
          </div>
          <div className="flex-1 space-y-12 lg:space-y-32 pt-32 lg:pt-64">
            <RevealingImage
              src="/image/about-us-3.jpeg"
              alt="Charming traditional Portuguese village street"
              className="aspect-square overflow-hidden rounded-2xl shadow-xl"
              delay={100}
            />
            <RevealingImage
              src="/image/about-us-4.jpeg"
              alt="Horseback riding adventure through the Algarve countryside"
              className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl"
              delay={300}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex items-center justify-start bg-[#fdfdfb] lg:bg-transparent">
          <div className="max-w-2xl px-6 lg:pl-24 lg:pr-10">
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

      {/* Testimonials Section */}
      <section className="py-24 md:py-40 bg-[#fdfdfb]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">{t('home.testimonials.eyebrow')}</span>
              <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-[#0d4357] tracking-tight mb-6 uppercase">
                {t('home.testimonials.title')}
              </h2>
            </div>

            {/* TripAdvisor Branding - Subtle Version */}
            <div className="flex items-center space-x-5 lg:pb-2">
              <div className="flex flex-col items-end border-r border-slate-200 pr-5">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl font-bold text-[#0d4357] font-montserrat tracking-tight leading-none">4.8</span>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#00af87]"></div>
                    ))}
                  </div>
                </div>
                <p className="text-[#0d4357]/40 text-[9px] font-bold uppercase tracking-[0.2em]">{t('home.testimonials.reviews')}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[#0d4357] font-bold text-[11px] uppercase tracking-wider leading-tight">{t('home.testimonials.rating')}</p>
                <p className="text-[#00af87] text-[10px] font-bold uppercase tracking-[0.1em] mt-0.5">{t('home.testimonials.tripadvisor')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {t('home.testimonials.items').map((testimonial: any, i: number) => (
              <div key={i} className="bg-white p-10 md:p-12 rounded-2xl border border-slate-50 hover:shadow-xl transition-all duration-500 flex flex-col h-full group">
                <div className="flex items-center space-x-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#00af87] group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}></div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[#0d4357] mb-6 uppercase tracking-tight leading-tight">{testimonial.title}</h3>
                <p className="text-[#0d4357]/60 font-light leading-relaxed mb-10 flex-grow italic">"{testimonial.content}"</p>
                <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div className="max-w-[60%]">
                    <p className="text-[#0d4357] font-bold text-[11px] uppercase tracking-widest truncate">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-[#0d4357]/30 text-[9px] font-bold uppercase tracking-[0.2em] mt-1 truncate">{testimonial.location}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[#0d4357]/40 text-[9px] font-bold uppercase tracking-[0.2em]">{testimonial.date}</p>
                    {testimonial.type && (
                      <p className="text-[#da6927] text-[9px] font-bold uppercase tracking-[0.2em] mt-1">{testimonial.type}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default Home;