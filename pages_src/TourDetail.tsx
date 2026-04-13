'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import FooterCTA from '@/components/FooterCTA';
import PageTransition from '@/components/PageTransition';
import ParallaxImage from '@/components/ParallaxImage';
import MagneticButton from '@/components/MagneticButton';
import { motion } from 'framer-motion';
import { useSharedImage } from '@/components/SharedImageTransition';
import { experiences as kibanExperiences, ExperienceEntry } from '@/services/kiban';
import {
  MapPin, Clock,
  Download, ArrowRight, Check,
  Info, Users, Mountain, ShieldCheck,
  ChevronLeft, ChevronRight, Calendar
} from 'lucide-react';

const TourDetail: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const { t, language } = useLanguage();
  const [tour, setTour] = useState<ExperienceEntry | null>(null);
  const [recommended, setRecommended] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { completeTransition, transitionState } = useSharedImage();

  useEffect(() => {
    if (slug) loadTour();
  }, [slug]);

  const loadTour = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const { data, error } = await kibanExperiences.getBySlug(slug);
      if (error || !data) {
        setTour(null);
        return;
      }
      setTour(data);

      // Load recommended tours
      const { data: rec } = await kibanExperiences.recommended(data.category, data.id, 3);
      setRecommended(rec);
    } catch (err) {
      console.error('Error loading tour:', err);
      setTour(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transitionState.isTransitioning) {
      const timer = setTimeout(() => {
        completeTransition();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [transitionState.isTransitioning, completeTransition]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbf9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da6927] mx-auto mb-4"></div>
          <p className="text-brand-body/60 text-sm uppercase tracking-widest">
            {language === 'pt' ? 'A carregar...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="pt-32 px-6 text-center min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold font-montserrat text-brand-navy mb-6 uppercase tracking-tight">
          {language === 'pt' ? 'Experiência Não Encontrada' : 'Experience Not Found'}
        </h1>
        <Link
          href="/tours"
          className="bg-[#da6927] text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0d4357] transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
        >
          {language === 'pt' ? 'Voltar para todos os tours' : 'Back to all tours'}
        </Link>
      </div>
    );
  }

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const move = direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5;
      sliderRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  const displayTitle = language === 'pt' ? tour.title_pt : tour.title_en;
  const displayDuration = formatDuration(tour.duration_minutes);
  const displayDifficulty = language === 'pt' ? (tour.difficulty_pt || 'Moderado') : (tour.difficulty_en || 'Moderate');
  const displayDesc = language === 'pt' ? tour.description_pt : tour.description_en;
  const displayAgeRange = tour.age_min && tour.age_max ? `${tour.age_min}-${tour.age_max}` : '6-65';

  // Highlights from KIBAN
  const highlights = (language === 'pt' ? tour.highlights_pt : tour.highlights_en) || [];
  const mappedHighlights = highlights.map((text, i) => ({
    text,
    image: tour.image_urls?.[i + 1] || tour.image_urls?.[0] || '/image/placeholder.jpg'
  }));

  // Included items
  const includedItems = (language === 'pt' ? tour.included_pt : tour.included_en) || [];

  // Itinerary from KIBAN
  const itinerary = (language === 'pt' ? tour.itinerary_pt : tour.itinerary_en) || [];

  // Stagger animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#fffbf9] min-h-screen">
      {/* Cinematic Hero — matching site-wide editorial header style */}
      <section className="relative h-[90vh] md:h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-white group">
        {/* Background image — Revitalized with full color and scrim */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxImage
            src={tour.image_urls?.[0] || '/image/placeholder.jpg'}
            alt={`Breathtaking overview of ${displayTitle}`}
            scrollStrength={0.2}
            mouseStrength={0.04}
            objectPosition="right center"
          />
          {/* Scrim Overlay - Neutral Gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <motion.div
          className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full pb-16 md:pb-24"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 drop-shadow-lg"
            variants={staggerItem}
          >
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <span className="text-white/50">/</span>
            <Link href="/tours" className="hover:text-white transition-colors">{t('nav.tours')}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white truncate max-w-[200px]">{displayTitle}</span>
          </motion.div>

          {/* Meta pills */}
          <motion.div className="flex items-center gap-4 mb-6" variants={staggerItem}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#da6927] border border-[#da6927]/60 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
              {displayDuration}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white border border-white/30 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
              {displayDifficulty}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat text-white leading-[1.05] tracking-tight uppercase max-w-5xl drop-shadow-xl"
            variants={staggerItem}
          >
            {displayTitle}
          </motion.h1>
        </motion.div>
      </section>


      {/* Main Content Area */}
      <section className="py-24 md:py-32 bg-[#fffbf9] relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative min-h-screen">

            {/* Left: Main Content */}
            <div className="lg:col-span-8 space-y-32">
              <div>
                <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">
                  {t('tourDetail.experience.eyebrow')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy mb-12 tracking-tight leading-tight uppercase">
                  {displayTitle}
                </h2>
                <div className="prose prose-xl text-brand-body/90 font-light leading-relaxed">
                  <div className="text-lg md:text-xl text-brand-body/90 font-light leading-relaxed space-y-10 whitespace-pre-line">
                    {displayDesc}
                  </div>
                </div>

                {tour.hotel_pickup && (
                  <div className="mt-16 bg-[#fffbf9] border border-slate-100 p-10 rounded-2xl flex items-start gap-6">
                    <div className="bg-[#da6927]/10 p-3 rounded-full">
                      <Info className="text-[#da6927]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-body uppercase tracking-widest mb-2">
                        {language === 'pt' ? 'Informação Importante' : 'Important to Note'}
                      </p>
                      <p className="text-brand-body/90 text-lg font-light leading-relaxed m-0">
                        {language === 'pt' ? (tour.pickup_details_pt || 'Recolha incluída.') : (tour.pickup_details_en || 'Pickup included.')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlights Slider */}
              <div className="pt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 md:gap-10">
                  <div className="w-full md:w-auto text-center md:text-left">
                    <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">
                      {language === 'pt' ? 'Diário Visual' : 'Visual Diary'}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">
                      {t('tourDetail.highlights')}
                    </h3>
                  </div>
                  <div className="flex gap-3 pb-2 justify-center md:justify-start">
                    <button
                      onClick={() => scrollSlider('left')}
                      className="min-w-[48px] min-h-[48px] md:w-14 md:h-14 rounded-full border border-[#0d4357]/10 flex items-center justify-center text-brand-body hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all duration-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                      aria-label="Scroll highlights left"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => scrollSlider('right')}
                      className="min-w-[48px] min-h-[48px] md:w-14 md:h-14 rounded-full border border-[#0d4357]/10 flex items-center justify-center text-brand-body hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all duration-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                      aria-label="Scroll highlights right"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-[2.5rem] overflow-hidden">
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-4 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    {mappedHighlights.map((h, i) => (
                      <div key={i} className="flex-none w-[90%] md:w-[48%] snap-start group relative aspect-[3/4] overflow-hidden rounded-[2.5rem]">
                        <img
                          src={h.image}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          alt={`Highlight: ${h.text}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d4357]/90 via-[#0d4357]/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                          <span className="text-[#da6927] text-[10px] md:text-[11px] font-bold font-montserrat uppercase tracking-[0.3em] mb-2 block">
                            {i + 1} / {mappedHighlights.length}
                          </span>
                          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold font-montserrat text-white tracking-tight uppercase leading-tight">
                            {h.text}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="text-2xl font-bold font-montserrat text-brand-navy mb-16 uppercase tracking-[0.3em]">
                  {language === 'pt' ? 'O Itinerário' : 'The Itinerary'}
                </h3>
                <div className="space-y-0 relative border-l border-slate-100 ml-4">
                  {itinerary.map((item: any, i: number) => (
                    <div key={i} className="pl-12 pb-20 relative last:pb-0 group">
                      <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-white border-2 border-[#da6927] rounded-full group-hover:scale-125 transition-transform"></div>
                      <h4 className={`text-2xl font-bold font-montserrat text-brand-navy ${item.stop_time ? 'mb-2' : 'mb-4'} tracking-tight uppercase`}>{item.title}</h4>
                      {item.stop_time && (
                        <p className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest mb-4">
                          {language === 'pt' ? 'Paragem:' : 'Stop:'} {item.stop_time}
                        </p>
                      )}
                      <p className="text-brand-body/50 text-base md:text-lg font-light leading-relaxed max-w-2xl">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Preparation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-24 border-t border-slate-100">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-10">
                    {t('tourDetail.inclusions.title')}
                  </h4>
                  <ul className="space-y-5">
                    {(includedItems.length > 0 ? includedItems : [
                      t('tourDetail.inclusions.guide'),
                      language === 'pt' ? 'Apoio em Trilho' : 'Trail Support',
                      language === 'pt' ? 'Seguro de Aventura' : 'Adventure Insurance',
                      t('tourDetail.inclusions.snack')
                    ]).map((item, i) => (
                      <li key={i} className="flex items-center space-x-4 text-brand-body/70 font-medium">
                        <span className="flex-shrink-0"><Check className="text-[#da6927]" size={18} /></span>
                        <span className="text-sm uppercase tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-10">
                    {language === 'pt' ? 'Preparação' : 'Preparation'}
                  </h4>
                  <p className="text-brand-body/50 text-sm font-light leading-relaxed">
                    {language === 'pt' ? "Recomendamos roupa leve e respirável e calçado resistente. A proteção solar é essencial durante todo o ano. Todo o equipamento fornecido é inspecionado antes de cada passeio para sua segurança." : "We recommend light, breathable clothing and sturdy footwear. Sun protection is essential year-round. All gear provided is inspected before every tour for your safety."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Sticky Booking Card */}
            <div className="lg:col-span-4 relative h-full flex flex-col">
              <div className="sticky top-[10%] z-20 transition-all duration-300">
                <div className="bg-[#fcfcf9] p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="mb-14">
                    <p className="text-brand-body/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                      {t('tourDetail.booking')}
                    </p>
                    <div className="mb-4">
                      <span className="bg-[#da6927] text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {t('home.featured.discount')}
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl md:text-5xl font-bold font-montserrat text-brand-navy tracking-tighter">€{tour.price || 0}</span>
                      <span className="text-brand-body/30 text-xs font-bold uppercase tracking-widest">P.P.</span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-14">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Clock size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{language === 'pt' ? 'DURAÇÃO' : 'DURATION'}</span>
                      </div>
                      <span className="font-bold text-brand-navy font-bold text-xs uppercase tracking-tight">{displayDuration}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Mountain size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-body/80">{language === 'pt' ? 'NÍVEL' : 'LEVEL'}</span>
                      </div>
                      <span className="font-bold text-brand-body text-xs uppercase tracking-tight">
                        {displayDifficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Users size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('tourDetail.maxSize')}</span>
                      </div>
                      <span className="font-bold text-brand-body text-xs uppercase tracking-tight">MAX {tour.max_participants || 21} PERSONS</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Calendar size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('tourDetail.ageRange')}</span>
                      </div>
                      <span className="font-bold text-brand-body text-xs uppercase tracking-tight">{displayAgeRange}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <ShieldCheck size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{language === 'pt' ? 'GUIA' : 'GUIDE'}</span>
                      </div>
                      <span className="font-bold text-brand-body text-xs uppercase tracking-tight">{language === 'pt' ? 'CERTIFICADO' : 'CERTIFIED'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <MagneticButton
                      as="a"
                      href="#/contacts"
                      magneticType="dark"
                      strength={0.35}
                      className="flex items-center justify-center space-x-3 w-full bg-[#0d4357] hover:bg-[#da6927] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-md group/btn focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <span>{t('tourDetail.buttons.book')}</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </MagneticButton>
                    <MagneticButton
                      as="button"
                      magneticType="light"
                      strength={0.25}
                      className="flex items-center justify-center space-x-3 w-full bg-white text-brand-body/80 py-6 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] border border-slate-100 hover:bg-[#0d4357] hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <Download size={14} />
                      <span>{t('tourDetail.buttons.download')}</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-32 md:py-48 bg-[#fffbf9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">
                {t('tourDetail.recommended.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">
                {t('tourDetail.recommended.title')}
              </h2>
            </div>
            <Link href="/tours" className="text-brand-navy font-bold uppercase tracking-widest text-[11px] border-b border-[#0d4357] pb-2 hover:text-[#da6927] hover:border-[#da6927] transition-all">
              {t('tourDetail.recommended.viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {recommended.map((rec) => (
              <Link key={rec.id} href={`/tours/${rec.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-8">
                  <img
                    src={rec.image_urls?.[0] || '/image/placeholder.jpg'}
                    className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-1000"
                    alt={`Recommended tour: ${language === 'pt' ? rec.title_pt : rec.title_en}`}
                  />
                </div>
                <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest block mb-3">
                  {formatDuration(rec.duration_minutes)}
                </span>
                <h4 className="text-2xl font-bold font-montserrat text-brand-navy tracking-tight group-hover:text-[#da6927] transition-colors uppercase">
                  {language === 'pt' ? rec.title_pt : rec.title_en}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
      </div>
    </PageTransition>
  );
};

export default TourDetail;