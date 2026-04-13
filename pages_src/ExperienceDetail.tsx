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
import { experiences as kibanExperiences, ExperienceEntry } from '@/services/kiban';
import {
  MapPin, Clock,
  Download, ArrowRight, Check,
  Info, Users, Mountain, ShieldCheck,
  ChevronLeft, ChevronRight, Calendar,
  Globe, XCircle, CheckCircle, AlertCircle, AlertTriangle, Zap, Smartphone
} from 'lucide-react';

const ExperienceDetail: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const { t, language } = useLanguage();
  const [experience, setExperience] = useState<ExperienceEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState<ExperienceEntry[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      loadExperience();
    }
  }, [slug]);

  const loadExperience = async () => {
    if (!slug) return;

    setLoading(true);
    try {
      // Load main experience from KIBAN
      const { data, error } = await kibanExperiences.getBySlug(slug);

      if (error || !data) {
        console.error('Error loading experience:', error);
        setExperience(null);
        return;
      }

      setExperience(data);

      // Load recommended experiences (same category, different id)
      const { data: recommendedData } = await kibanExperiences.recommended(
        data.category,
        data.id,
        3
      );

      setRecommended(recommendedData);
    } catch (error) {
      console.error('Error loading experience:', error);
      setExperience(null);
    } finally {
      setLoading(false);
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const move = direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5;
      sliderRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
    }
  };

  const formatDuration = (minutes: number) => {
    if (!minutes || minutes === 0) {
      return language === 'pt' ? 'N/A' : 'N/A';
    }

    if (minutes < 60) {
      return language === 'pt' ? `${minutes} min` : `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
      const hourLabel = language === 'pt' ? 'hora' : 'hour';
      const hoursLabel = language === 'pt' ? 'horas' : 'hours';
      return `${hours} ${hours === 1 ? hourLabel : hoursLabel}`;
    }

    const hourLabel = language === 'pt' ? 'hora' : 'hour';
    const hoursLabel = language === 'pt' ? 'horas' : 'hours';
    return `${hours} ${hours === 1 ? hourLabel : hoursLabel} ${mins}min`;
  };

  // Stagger animation variants
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

  // Loading state
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

  // Experience not found
  if (!experience) {
    return (
      <div className="pt-32 px-6 text-center min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold font-montserrat text-brand-navy mb-6 uppercase tracking-tight">
          {language === 'pt' ? 'Experiência Não Encontrada' : 'Experience Not Found'}
        </h1>
        <Link
          href="/experiences"
          className="bg-[#da6927] text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0d4357] transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
        >
          {language === 'pt' ? 'Voltar para experiências' : 'Back to experiences'}
        </Link>
      </div>
    );
  }

  const displayTitle = language === 'pt' ? experience.title_pt : experience.title_en;
  const displayDuration = formatDuration(experience.duration_minutes);
  const displayDifficulty = language === 'pt' ? (experience.difficulty_pt || 'Moderada') : (experience.difficulty_en || 'Moderate');
  const displayDesc = language === 'pt' ? experience.description_pt : experience.description_en;
  const displayShortDesc = language === 'pt' ? experience.short_description_pt : experience.short_description_en;

  // Map highlights with images
  const highlights = (language === 'pt' ? experience.highlights_pt : experience.highlights_en) || [];
  const mappedHighlights = highlights.map((text, i) => ({
    text,
    image: experience.image_urls?.[i + 1] || experience.image_urls?.[0] || '/image/placeholder.jpg'
  }));

  // Included items
  const includedItems = (language === 'pt' ? experience.included_pt : experience.included_en) || [];

  // Category label
  const categoryLabel = experience.category === 'tours'
    ? (language === 'pt' ? 'TOURS' : 'TOURS')
    : experience.category === 'transfers'
    ? (language === 'pt' ? 'TRANSFERS' : 'TRANSFERS')
    : (language === 'pt' ? 'EXPERIÊNCIAS' : 'EXPERIENCES');

  return (
    <PageTransition>
      <div className="bg-[#fffbf9] min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[90vh] md:h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-white group">
        {/* Background image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxImage
            src={experience.image_urls?.[0] || '/image/placeholder.jpg'}
            alt={`${displayTitle}`}
            scrollStrength={0.2}
            mouseStrength={0.04}
            objectPosition="right center"
          />
          {/* Scrim Overlay */}
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
            <Link href="/experiences" className="hover:text-white transition-colors">
              {language === 'pt' ? 'Experiências' : 'Experiences'}
            </Link>
            <span className="text-white/50">/</span>
            <span className="text-white truncate max-w-[200px]">{displayTitle}</span>
          </motion.div>

          {/* Meta pills */}
          <motion.div className="flex items-center gap-4 mb-6" variants={staggerItem}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#da6927] border border-[#da6927]/60 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
              {displayDuration}
            </span>
            {experience.difficulty_pt && (
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white border border-white/30 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                {displayDifficulty}
              </span>
            )}
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
      <section className="py-16 md:py-24 bg-[#fffbf9] relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative min-h-screen">

            {/* Left: Main Content */}
            <div className="lg:col-span-8 space-y-20">
              <div>
                <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">
                  {displayShortDesc?.toUpperCase() || categoryLabel}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy mb-8 tracking-tight leading-tight uppercase">
                  {displayTitle}
                </h2>
                <div className="prose prose-xl text-brand-body/90 font-light leading-relaxed">
                  <div className="text-base md:text-lg text-brand-body/90 font-light leading-relaxed space-y-6 whitespace-pre-line">
                    {displayDesc}
                  </div>
                </div>
              </div>

              {/* Highlights Slider */}
              {mappedHighlights.length > 0 && (
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 md:gap-8">
                    <div className="w-full md:w-auto text-center md:text-left">
                      <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-3 block">
                        {language === 'pt' ? 'Diário Visual' : 'Visual Diary'}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">
                        {language === 'pt' ? 'Destaques' : 'Highlights'}
                      </h3>
                    </div>
                    {mappedHighlights.length > 1 && (
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
                    )}
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
              )}

              {/* Included / Preparation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-slate-100">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-8">
                    {language === 'pt' ? 'Incluído' : "What's Included"}
                  </h4>
                  {includedItems.length > 0 ? (
                    <ul className="space-y-4">
                      {includedItems.map((item, i) => (
                        <li key={i} className="flex items-center space-x-3 text-brand-body/70 font-medium">
                          <span className="flex-shrink-0"><Check className="text-[#da6927]" size={16} /></span>
                          <span className="text-sm uppercase tracking-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3 text-brand-body/70 font-medium">
                        <span className="flex-shrink-0"><Check className="text-[#da6927]" size={16} /></span>
                        <span className="text-sm uppercase tracking-tight">{language === 'pt' ? 'Guia Experiente' : 'Expert Guide'}</span>
                      </li>
                      <li className="flex items-center space-x-3 text-brand-body/70 font-medium">
                        <span className="flex-shrink-0"><Check className="text-[#da6927]" size={16} /></span>
                        <span className="text-sm uppercase tracking-tight">{language === 'pt' ? 'Seguro' : 'Insurance'}</span>
                      </li>
                      <li className="flex items-center space-x-3 text-brand-body/70 font-medium">
                        <span className="flex-shrink-0"><Check className="text-[#da6927]" size={16} /></span>
                        <span className="text-sm uppercase tracking-tight">{language === 'pt' ? 'Equipamento' : 'Equipment'}</span>
                      </li>
                    </ul>
                  )}
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-8">
                    {language === 'pt' ? 'Preparação' : 'Preparation'}
                  </h4>
                  <p className="text-brand-body/60 text-sm font-light leading-relaxed">
                    {language === 'pt'
                      ? "Recomendamos roupa confortável e calçado adequado. Proteção solar é essencial. Todo o equipamento fornecido é inspecionado antes de cada experiência."
                      : "We recommend comfortable clothing and appropriate footwear. Sun protection is essential. All equipment provided is inspected before each experience."}
                  </p>
                </div>
              </div>

              {/* Practical Information - Nova Secção */}
              <div className="pt-16 border-t border-slate-100">
                <div className="mb-12">
                  <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-3 block">
                    {language === 'pt' ? 'Detalhes' : 'Details'}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-brand-navy uppercase tracking-tight">
                    {language === 'pt' ? 'Informação Prática' : 'Practical Information'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Age Restrictions */}
                  {(experience.age_min || experience.age_max) && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-5 flex items-center gap-2">
                        <Users size={14} className="text-[#da6927]" />
                        {language === 'pt' ? 'Restrições de Idade' : 'Age Restrictions'}
                      </h4>
                      <p className="text-brand-navy font-bold text-base mb-3">
                        {experience.age_min || 0} - {experience.age_max || 99} {language === 'pt' ? 'anos' : 'years'}
                      </p>
                      {experience.age_description_pt && (
                        <p className="text-brand-body/60 text-sm leading-relaxed">
                          {language === 'pt' ? experience.age_description_pt : experience.age_description_en}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Cancellation Policy */}
                  {experience.cancellation_policy_pt && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-5 flex items-center gap-2">
                        <XCircle size={14} className="text-[#da6927]" />
                        {language === 'pt' ? 'Política de Cancelamento' : 'Cancellation Policy'}
                      </h4>
                      <p className="text-brand-body/60 text-sm leading-relaxed mb-3">
                        {language === 'pt' ? experience.cancellation_policy_pt : experience.cancellation_policy_en}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                        <CheckCircle size={12} />
                        {language === 'pt' ? 'Reembolso total' : 'Full refund'}
                      </div>
                    </div>
                  )}

                  {/* Pickup Details */}
                  {experience.hotel_pickup && experience.pickup_details_pt && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-5 flex items-center gap-2">
                        <MapPin size={14} className="text-[#da6927]" />
                        {language === 'pt' ? 'Recolha no Hotel' : 'Hotel Pickup'}
                      </h4>
                      <div className="mb-3 inline-flex items-center gap-2 bg-[#da6927]/10 text-[#da6927] px-3 py-1.5 rounded-full text-xs font-semibold">
                        <CheckCircle size={12} />
                        {language === 'pt' ? 'Incluído' : 'Included'}
                      </div>
                      <p className="text-brand-body/60 text-sm leading-relaxed">
                        {language === 'pt' ? experience.pickup_details_pt : experience.pickup_details_en}
                      </p>
                    </div>
                  )}

                  {/* Accessibility */}
                  {experience.accessibility_notes_pt && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-5 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#da6927]" />
                        {language === 'pt' ? 'Acessibilidade' : 'Accessibility'}
                      </h4>
                      {experience.wheelchair_accessible ? (
                        <div className="mb-3 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                          <CheckCircle size={12} />
                          {language === 'pt' ? 'Acessível' : 'Wheelchair accessible'}
                        </div>
                      ) : (
                        <div className="mb-3 inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                          <AlertCircle size={12} />
                          {language === 'pt' ? 'Não acessível' : 'Not accessible'}
                        </div>
                      )}
                      <p className="text-brand-body/60 text-sm leading-relaxed">
                        {language === 'pt' ? experience.accessibility_notes_pt : experience.accessibility_notes_en}
                      </p>
                    </div>
                  )}
                </div>

                {/* Not Suitable For */}
                {experience.not_suitable_for_pt && experience.not_suitable_for_pt.length > 0 && (
                  <div className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-900 mb-4 flex items-center gap-2">
                      <AlertTriangle size={14} />
                      {language === 'pt' ? 'Não Recomendado Para' : 'Not Suitable For'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'pt' ? experience.not_suitable_for_pt : experience.not_suitable_for_en)?.map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                          <XCircle size={11} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Sticky Booking Card */}
            <div className="lg:col-span-4 relative h-full flex flex-col">
              <div className="sticky top-[10%] z-20 transition-all duration-300">
                <div className="bg-[#fcfcf9] p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="mb-10">
                    <p className="text-brand-body/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                      {language === 'pt' ? 'Reserve Agora' : 'Book Now'}
                    </p>
                    {experience.featured && (
                      <div className="mb-4">
                        <span className="bg-[#da6927] text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {language === 'pt' ? 'Em Destaque' : 'Featured'}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl md:text-5xl font-bold font-montserrat text-brand-navy tracking-tighter">€{experience.price}</span>
                      <span className="text-brand-body/30 text-xs font-bold uppercase tracking-widest">P.P.</span>
                    </div>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Clock size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{language === 'pt' ? 'DURAÇÃO' : 'DURATION'}</span>
                      </div>
                      <span className="font-bold text-brand-navy font-bold text-xs uppercase tracking-tight">{displayDuration}</span>
                    </div>
                    {experience.difficulty_pt && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <Mountain size={18} className="text-[#da6927]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-body/80">{language === 'pt' ? 'NÍVEL' : 'LEVEL'}</span>
                        </div>
                        <span className="font-bold text-brand-body text-xs uppercase tracking-tight">
                          {displayDifficulty}
                        </span>
                      </div>
                    )}
                    {experience.max_participants && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <Users size={18} className="text-[#da6927]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{language === 'pt' ? 'CAPACIDADE' : 'CAPACITY'}</span>
                        </div>
                        <span className="font-bold text-brand-body text-xs uppercase tracking-tight">MAX {experience.max_participants} {language === 'pt' ? 'PESSOAS' : 'PEOPLE'}</span>
                      </div>
                    )}

                    {/* Ages */}
                    {(experience.age_min || experience.age_max) && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <Users size={18} className="text-[#da6927]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">
                            {language === 'pt' ? 'IDADES' : 'AGES'}
                          </span>
                        </div>
                        <span className="font-bold text-brand-body text-xs uppercase tracking-tight">
                          {experience.age_min || 0} - {experience.age_max || 99} {language === 'pt' ? 'ANOS' : 'YEARS'}
                        </span>
                      </div>
                    )}

                    {/* Meeting Point */}
                    {experience.meeting_point_pt && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <MapPin size={18} className="text-[#da6927]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">
                            {language === 'pt' ? 'ENCONTRO' : 'MEETING POINT'}
                          </span>
                        </div>
                        <span className="font-bold text-brand-body text-xs text-right max-w-[150px]">
                          {language === 'pt' ? experience.meeting_point_pt : experience.meeting_point_en}
                        </span>
                      </div>
                    )}

                    {/* Departure Times */}
                    {experience.departure_times && experience.departure_times.length > 0 && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <Calendar size={18} className="text-[#da6927]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">
                            {language === 'pt' ? 'HORÁRIOS' : 'TIMES'}
                          </span>
                        </div>
                        <span className="font-bold text-brand-body text-xs">
                          {experience.departure_times.join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Languages */}
                    {experience.languages_offered && experience.languages_offered.length > 0 && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <Globe size={18} className="text-[#da6927]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">
                            {language === 'pt' ? 'IDIOMAS' : 'LANGUAGES'}
                          </span>
                        </div>
                        <span className="font-bold text-brand-body text-xs uppercase">
                          {experience.languages_offered.join(' • ')}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <ShieldCheck size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{language === 'pt' ? 'GUIA' : 'GUIDE'}</span>
                      </div>
                      <span className="font-bold text-brand-body text-xs uppercase tracking-tight">{language === 'pt' ? 'CERTIFICADO' : 'CERTIFIED'}</span>
                    </div>
                  </div>

                  {/* Additional Features Badges */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {experience.instant_confirmation && (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        <Zap size={12} />
                        {language === 'pt' ? 'Confirmação Instantânea' : 'Instant Confirmation'}
                      </span>
                    )}
                    {experience.mobile_ticket_accepted && (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        <Smartphone size={12} />
                        {language === 'pt' ? 'Ticket Móvel' : 'Mobile Ticket'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <MagneticButton
                      as="a"
                      href={experience.fareharbor_url || "/contacts"}
                      magneticType="dark"
                      strength={0.35}
                      target={experience.fareharbor_url ? "_blank" : undefined}
                      rel={experience.fareharbor_url ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-center space-x-3 w-full bg-[#0d4357] hover:bg-[#da6927] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-md group/btn focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <span>{language === 'pt' ? 'RESERVAR AGORA' : 'BOOK NOW'}</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </MagneticButton>
                    <MagneticButton
                      as="button"
                      magneticType="light"
                      strength={0.25}
                      className="flex items-center justify-center space-x-3 w-full bg-white text-brand-body/80 py-6 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] border border-slate-100 hover:bg-[#0d4357] hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <Download size={14} />
                      <span>{language === 'pt' ? 'DESCARREGAR INFO' : 'DOWNLOAD INFO'}</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <section className="py-20 md:py-32 bg-[#fffbf9]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-3 block">
                  {language === 'pt' ? 'Mais Opções' : 'More Options'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">
                  {language === 'pt' ? 'Experiências Recomendadas' : 'Recommended Experiences'}
                </h2>
              </div>
              <Link href="/experiences" className="text-brand-navy font-bold uppercase tracking-widest text-[10px] border-b border-[#0d4357] pb-2 hover:text-[#da6927] hover:border-[#da6927] transition-all">
                {language === 'pt' ? 'VER TODAS' : 'VIEW ALL'}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {recommended.map((exp) => (
                <Link key={exp.id} href={`/experiences/${exp.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-8">
                    <img
                      src={exp.image_urls?.[0] || '/image/placeholder.jpg'}
                      className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-1000"
                      alt={language === 'pt' ? exp.title_pt : exp.title_en}
                    />
                  </div>
                  <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest block mb-3">
                    {formatDuration(exp.duration_minutes)}
                  </span>
                  <h4 className="text-2xl font-bold font-montserrat text-brand-navy tracking-tight group-hover:text-[#da6927] transition-colors uppercase">
                    {language === 'pt' ? exp.title_pt : exp.title_en}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterCTA />
      </div>
    </PageTransition>
  );
};

export default ExperienceDetail;
