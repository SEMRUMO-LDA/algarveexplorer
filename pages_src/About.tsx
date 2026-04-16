'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Users, Leaf, ArrowRight, ArrowLeft, Footprints, ShieldCheck, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import FooterCTA from '@/components/FooterCTA';
import AnimatedBlob from '@/components/AnimatedBlob';
import ParallaxCard from '@/components/ParallaxCard';

const About: React.FC = () => {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { title: t('about.values.partners.title'), icon: <Users size={32} />, desc: t('about.values.partners.desc') },
    { title: t('about.values.eco.title'), icon: <Leaf size={32} />, desc: t('about.values.eco.desc') },
    { title: t('about.values.slow.title'), icon: <Footprints size={32} />, desc: t('about.values.slow.desc') },
    { title: t('about.values.care.title'), icon: <ShieldCheck size={32} />, desc: t('about.values.care.desc') }
  ];

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const scrollRatio = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      const index = Math.max(0, Math.min(slides.length - 1, Math.round(scrollRatio * (slides.length - 1))));
      setActiveSlide(index);
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const move = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
      sliderRef.current.scrollBy({ left: move, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fffbf9] min-h-screen overflow-x-hidden">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="relative pt-32 pb-20 md:pt-64 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/image/about-us-toppage.jpg"
            alt="About Algarve Explorer"
            className="w-full h-full object-cover"
          />
          {/* Scrim Overlay - Editorial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('nav.story')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">{t('about.hero.eyebrow')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            {t('about.hero.title')}
          </h1>
          <p className="text-white max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {t('about.hero.desc')}
          </p>
        </div>
      </section>

      {/* Brand Narrative & Image Composition */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#fffbf9]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

            {/* Left Column: Brand Story */}
            <div className="w-full lg:w-1/2 order-1 lg:order-1">
              <div className="max-w-xl">
                <div className="flex items-center mb-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#da6927]">{t('about.story.eyebrow')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat text-brand-navy mb-12 tracking-tight leading-[1.1] uppercase">
                  {t('about.story.title')}
                </h2>
                <div className="space-y-8 text-brand-body/90 text-lg md:text-xl font-light leading-relaxed">
                  <p>{t('about.story.p1')}</p>
                  <p>{t('about.story.p2')}</p>
                </div>
                <div className="mt-16">
                  <Link
                    href="/tours"
                    className="inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#da6927] transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                  >
                    <span>{t('about.story.cta')}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Image Composition (Collage) */}
            <div className="w-full lg:w-1/2 order-2 lg:order-2">
              <div className="relative h-[400px] md:h-[500px] w-full max-w-2xl mx-auto">
                <ParallaxCard
                  src="/image/about-us-7.jpg"
                  alt="Breathtaking mountain range view from the Monchique peaks"
                  className="absolute top-0 right-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl z-10"
                  depth={0.3}
                />
                <ParallaxCard
                  src="/image/about-us-5.jpg"
                  alt="Close-up of golden coastal cliffs along the Atlantic Ocean"
                  className="absolute bottom-0 left-0 w-[60%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-2 border-white z-20 -rotate-3"
                  depth={0.6}
                />
                <ParallaxCard
                  src="/image/about-us-6.jpg"
                  alt="Authentic traditional Portuguese village life and architecture"
                  className="absolute top-10 left-10 w-[40%] h-[30%] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-30 opacity-80 md:opacity-100"
                  depth={0.9}
                />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#da6927]/10 rounded-full blur-3xl z-0"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="relative py-32 md:py-48 bg-[#fffbf9] overflow-hidden">
        <AnimatedBlob
          className="bottom-0 -right-24"
          opacity={0.25}
          size="w-[500px] h-[500px]"
          duration="40s"
        />
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
            <div className="pr-0 lg:pr-12">
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">{t('about.values.eyebrow')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat text-brand-navy mb-8 tracking-tight uppercase leading-none">{t('about.values.title')}</h2>
              <div className="space-y-6 text-brand-body/90 text-lg font-light leading-relaxed mb-16">
                <p>{t('about.values.p1')}</p>
                <p>{t('about.values.p2')}</p>
              </div>
              
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex space-x-3">
                  <button onClick={() => scrollSlider('left')} className="group w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0d4357]/20 flex items-center justify-center hover:bg-[#0d4357] hover:border-[#0d4357] outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <ArrowLeft size={20} strokeWidth={1.5} className="text-brand-navy group-hover:text-white group-hover:-translate-x-1 transition-all duration-500" />
                  </button>
                  <button onClick={() => scrollSlider('right')} className="group w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0d4357]/20 flex items-center justify-center hover:bg-[#da6927] hover:border-[#da6927] outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <ArrowRight size={20} strokeWidth={1.5} className="text-brand-navy group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                  </button>
                </div>
                
                <div className="flex-1 h-[2px] bg-[#0d4357]/10 relative overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-[#da6927] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-full" style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }} />
                </div>
                
                <div className="text-sm font-bold tracking-widest text-brand-navy font-montserrat w-16 text-right">
                  0{activeSlide + 1} <span className="text-brand-body/30">/ 0{slides.length}</span>
                </div>
              </div>
            </div>

            <div className="relative w-full -mr-6 lg:-mr-12">
              <div
                ref={sliderRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-12 px-6 lg:px-0 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {slides.map((val, i) => {
                  const isActive = activeSlide === i;
                  return (
                  <div 
                    key={i} 
                    className={`flex-none w-[85%] sm:w-[60%] lg:w-[65%] xl:w-[55%] snap-center p-8 lg:p-12 rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between min-h-[360px]
                      ${isActive ? 'bg-[#0d4357] border-white/10 shadow-[0_20px_40px_-15px_rgba(13,67,87,0.3)] scale-100 opacity-100 translate-y-0' : 'bg-white border-[#0d4357]/10 scale-95 opacity-50 blur-[1px] hover:blur-none hover:opacity-100 translate-y-4'}
                    `}
                  >
                    <div className="mb-12 inline-flex text-[#da6927] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 origin-left">
                      {val.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold font-montserrat mb-4 uppercase tracking-tight transition-colors duration-700 ${isActive ? 'text-white' : 'text-brand-navy'}`}>{val.title}</h3>
                      <p className={`text-sm leading-relaxed font-light transition-colors duration-700 ${isActive ? 'text-white/70' : 'text-brand-body/90'}`}>{val.desc}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default About;