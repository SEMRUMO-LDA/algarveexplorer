'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useSensoryTheme } from '@/lib/SensoryContext';
import FooterCTA from '@/components/FooterCTA';
import AnimatedBlob from '@/components/AnimatedBlob';
import ParallaxCard from '@/components/ParallaxCard';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { motion, useScroll, useTransform } from 'framer-motion';
import TripadvisorReviews from '@/components/TripadvisorReviews';
import { experiences as kibanExperiences, ExperienceEntry } from '@/services/kiban';

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
      className={`${className} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={src}
        className="w-full h-full object-cover transition-transform duration-700"
        alt={alt}
      />
    </div>
  );
};

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { vibrate } = useSensoryTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent initial video load on mobile
  const [featuredExperiences, setFeaturedExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadFeaturedExperiences();
  }, []);

  const loadFeaturedExperiences = async () => {
    try {
      const { data, error } = await kibanExperiences.featured(6);
      if (error) throw error;
      setFeaturedExperiences(data);
    } catch (error) {
      console.error('Error loading featured experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return language === 'pt' ? `${minutes} min` : `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return language === 'pt' ? `${hours}h` : `${hours}h`;
    }
    return language === 'pt' ? `${hours}h ${mins}min` : `${hours}h ${mins}min`;
  };

  const paddingLeftBase = "max(1.5rem, calc((100vw - 1600px) / 2 + 1.5rem))";
  const paddingLeftLg = "max(3rem, calc((100vw - 1600px) / 2 + 3rem))";

  // Define sections for the scroll indicator
  const sections = [
    { id: 'hero', label: 'Home', labelPt: 'Início' },
    { id: 'experiences', label: 'Experiences', labelPt: 'Experiências' },
    { id: 'transfers', label: 'Transfers', labelPt: 'Transfers' },
    { id: 'about', label: 'About', labelPt: 'Sobre' },
    { id: 'testimonials', label: 'Reviews', labelPt: 'Avaliações' }
  ];

  return (
    <div className="flex flex-col bg-[#fffbf9]">
      {/* Scroll Indicator */}
      <ScrollIndicator sections={sections} language={language} />

      {/* Hero Section */}
      <section id="hero" className="relative h-[100svh] md:h-screen lg:h-screen flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/image/the-region-hero.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/video/algarvexplorer-video-hero.mp4" type="video/mp4" />
          </video>
          {/* Lighter, Vibrancy-focused Overlay */}
          <div className="absolute inset-0 bg-[#0d4357]/10 transition-opacity duration-1000"></div>
          {/* Left-to-Right Gradient for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/60 via-[#0d4357]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        <div className="relative px-4 md:px-8 lg:px-16 w-full z-10">
          <div className="w-full">
            <span className="text-[11px] font-semibold text-white uppercase tracking-[0.4em] mb-4 md:mb-6 block">{t('home.hero.eyebrow')}</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-montserrat text-white leading-[0.9] tracking-tighter mb-6 md:mb-10 uppercase whitespace-pre-line drop-shadow-2xl">
              {t('home.hero.title')}
            </h1>
            <p className="font-sans text-white/90 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 md:mb-12 max-w-2xl">
              {t('home.hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
              <Link
                href="/tours"
                onClick={() => vibrate(15)}
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] bg-[#da6927] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[12px] hover:bg-[#0d4357] transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                {t('home.hero.exploreBtn')}
              </Link>
              <Link
                href="/algarve"
                onClick={() => vibrate(15)}
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[12px] hover:bg-white hover:text-brand-navy transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                {t('home.hero.regionBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#fffbf9] min-h-screen">
        {/* Title Section – Reduced padding and margin for better flow */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 pt-12 md:pt-16 pb-2 relative z-10 w-full shrink-0">
          <div className="max-w-2xl">
            <span className="text-[#da6927] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-2 md:mb-3 block">{t('home.featured.eyebrow')}</span>
            <h2 className="text-2xl md:text-4xl font-bold font-montserrat text-brand-navy tracking-tight mb-2 md:mb-3 uppercase">
              {t('home.featured.title')}
            </h2>
            <p className="text-brand-body/80 text-sm md:text-xl font-light leading-relaxed">
              {t('home.featured.desc')}
            </p>
          </div>
        </div>

        {/* Native Horizontal Scroll Section - Adjusted spacing */}
        <section id="experiences" className="relative bg-transparent z-10 pt-4 pb-16 md:pt-6 md:pb-24 lg:pt-8 lg:pb-32">
          <div className="relative overflow-hidden z-20">
            {/* Background Blobs (Now centered for the cards) */}
            <AnimatedBlob
              className="top-1/2 -translate-y-1/2 -right-48 pointer-events-none"
              opacity={0.15}
              size="w-[600px] h-[600px]"
              blur="140px"
              blendMode="normal"
            />

          {/* Navigation Controls */}
          <div className="flex justify-end gap-4 px-4 md:px-8 lg:px-16 mb-4 md:mb-8">
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.4, behavior: 'smooth' });
                  vibrate(10);
                }
              }}
              className="w-12 h-12 rounded-full border border-brand-navy/20 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.4, behavior: 'smooth' });
                  vibrate(10);
                }
              }}
              className="w-12 h-12 rounded-full border border-brand-navy/20 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-8 items-stretch w-full overflow-x-auto snap-x snap-mandatory pb-16 pt-0 scroll-smooth hide-scrollbar"
            style={{
              paddingLeft: `var(--container-pl, ${paddingLeftBase})`,
              paddingRight: `var(--container-pl, ${paddingLeftBase})`,
            }}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              div[style] { --container-pl: ${paddingLeftBase}; }
              @media (min-width: 1024px) {
                div[style] { --container-pl: ${paddingLeftLg}; }
              }
            `}</style>

            {loading ? (
              <div className="flex items-center justify-center w-full py-32">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da6927] mx-auto mb-4"></div>
                  <p className="text-brand-body/60 text-sm uppercase tracking-widest">
                    {language === 'pt' ? 'A carregar...' : 'Loading...'}
                  </p>
                </div>
              </div>
            ) : featuredExperiences.length === 0 ? (
              <div className="flex items-center justify-center w-full py-32">
                <p className="text-brand-body/60 text-lg">
                  {language === 'pt' ? 'Nenhuma experiência em destaque no momento.' : 'No featured experiences at the moment.'}
                </p>
              </div>
            ) : (
              featuredExperiences.map((experience) => (
                <div key={experience.id} className="snap-start flex-none w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[26vw] xl:w-[22vw] group h-[60svh] md:h-[65svh] min-h-[500px] max-h-[750px] flex flex-col">
                  <Link
                    href={`/experiences/${experience.slug}`}
                    className="group block bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-white h-full flex flex-col overflow-hidden"
                  >
                    <div className="h-[45%] md:h-[55%] w-full relative overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={experience.image_urls?.[0] || '/image/placeholder.jpg'}
                        alt={language === 'pt' ? experience.title_pt : experience.title_en}
                        className="w-full h-full object-cover object-right group-hover:scale-110 transition-transform duration-700"
                      />
                      {experience.difficulty_pt && (
                        <div className="absolute top-6 left-6">
                          <span className="bg-[#0d4357] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                            {language === 'pt' ? experience.difficulty_pt : experience.difficulty_en}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-10 pb-12 md:pb-20 flex flex-col flex-grow">
                      <span className="text-[#da6927] text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-4 block">
                        {formatDuration(experience.duration_minutes)}
                      </span>
                      <h3 className="text-lg md:text-2xl font-bold text-brand-navy mb-3 md:mb-6 line-clamp-2">
                         {language === 'pt' ? experience.title_pt : experience.title_en}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-4 md:pt-6 border-t border-slate-100">
                      <div className="flex flex-col">
                        {/* Commercial Badge */}
                        <div className="mb-2 flex">
                          <span className="bg-[#da6927] text-white text-[7px] md:text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            {t('home.featured.discount')}
                          </span>
                        </div>
                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] text-brand-body/60 mb-0.5 md:mb-1">
                          {language === 'pt' ? 'A partir de' : 'Starting from'}
                        </span>
                        <span className="text-xl md:text-2xl font-bold font-montserrat text-brand-navy tracking-tight">
                          €{experience.price}
                        </span>
                      </div>
                        <div className="flex items-center space-x-2 text-brand-body group-hover:text-[#da6927] transition-colors">
                          <span className="text-[10px] font-bold uppercase tracking-widest">{language === 'pt' ? 'Explorar' : 'Explore'}</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
          </div>
        </section>
      </div>

      {/* Transfers Section - Overlapping to remove gap */}
      <section id="transfers" className="py-16 md:py-24 lg:py-32 bg-[#0d4357] relative overflow-hidden -mt-20 md:-mt-32">
        {/* Background Glowing Blobs */}
        <AnimatedBlob 
          className="-top-24 -right-24" 
          opacity={0.4} 
          size="w-[700px] h-[700px]"
          duration="40s"
          blendMode="screen"
        />
        <AnimatedBlob 
          className="-bottom-48 -left-24" 
          opacity={0.3} 
          size="w-[600px] h-[600px]"
          alternate={true}
          duration="35s"
          blendMode="color-dodge"
        />
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="inline-flex items-center mb-6">
                <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em]">
                  {t('home.transfers.eyebrow')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white tracking-tight mb-8 uppercase leading-tight">
                {t('home.transfers.title')}
              </h2>
              <p className="text-white text-lg md:text-xl font-light leading-relaxed mb-12">
                {t('home.transfers.desc')}
              </p>

              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-3 md:p-4">
                <iframe
                  src={`https://transfersgo.pt/app/?org=nunoess&mode=widget&lang=${language === 'pt' ? 'pt' : 'en'}`}
                  width="100%"
                  height="240"
                  frameBorder="0"
                  className="w-full rounded-lg"
                  style={{ border: 0, minHeight: '240px', maxHeight: '280px' }}
                  title="TransfersGo Booking"
                ></iframe>
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <RevealingImage
                src="/image/transfer.jpg"
                alt="Algarve Explorer Transfer Van"
                className="aspect-[4/3] w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl"
                delay={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative flex flex-col lg:flex-row bg-[#fffbf9] overflow-hidden">
        {/* Background Blob - Reduced opacity for mobile readability */}
        <AnimatedBlob
          className="top-1/3 -right-32 z-0 pointer-events-none"
          opacity={isMobile ? 0.3 : 0.45}
          size="w-[800px] h-[800px]"
          duration="50s"
          blur="160px"
          blendMode="normal"
        />
        <div className="w-full lg:w-1/2 px-4 md:px-6 lg:pl-12 lg:pr-6 py-16 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
            {/* Base Image - Bottom Right focus */}
            <ParallaxCard
              src="/image/about-us-1.jpeg"
              alt="Hiker overlooking a mountain trail"
              className="absolute top-0 right-0 w-[85%] h-[75%] rounded-3xl overflow-hidden shadow-xl z-10"
              depth={0.2}
            />

            {/* Overlapping Image - Left side stack */}
            <ParallaxCard
              src="/image/about-us-2.jpeg"
              alt="Dramatic coastal cliffs meeting the Atlantic Ocean"
              className="absolute bottom-4 left-0 w-[65%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 -rotate-3"
              depth={0.5}
            />

            {/* Accent Image - Floating right */}
            <ParallaxCard
              src="/image/about-us-3.jpeg"
              alt="Charming traditional Portuguese village street"
              className="absolute bottom-20 -right-8 w-[45%] h-[40%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-30 rotate-3"
              depth={0.7}
            />

            {/* Floating Top Image - Offset left */}
            <ParallaxCard
              src="/image/about-us-4.jpeg"
              alt="Horseback riding adventure through the Algarve countryside"
              className="hidden md:block absolute top-[15%] left-[8%] w-[35%] h-[30%] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-40 -rotate-6"
              depth={0.9}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:min-h-screen lg:sticky lg:top-0 flex items-center justify-start bg-[#fffbf9] lg:bg-transparent py-16 md:py-24 lg:py-0">
          <div className="max-w-2xl px-6 md:px-8 lg:pl-24 lg:pr-10">
            <div className="inline-flex items-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#da6927]">{t('home.about.eyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy leading-[1.1] tracking-tight mb-8 uppercase">
              {t('home.about.title')}
            </h2>
            <div className="text-brand-body/90 text-base md:text-lg font-light leading-relaxed mb-10">
              {t('home.about.p1')}<br /><br />
              {t('home.about.p2')}<br /><br />
              {t('home.about.p3')}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center space-x-3 bg-[#0d4357] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[12px] hover:bg-white hover:text-[#0d4357] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                <span>{t('home.about.philosophy')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TripAdvisor Reviews Section */}
      <TripadvisorReviews />

      <FooterCTA />
    </div>
  );
};

export default Home;