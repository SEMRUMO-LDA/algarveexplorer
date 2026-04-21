'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FooterCTA from '@/components/FooterCTA';
import PageTransition from '@/components/PageTransition';
import MagneticButton from '@/components/MagneticButton';
import { motion } from 'framer-motion';
import { useSharedImage } from '@/components/SharedImageTransition';
import { tours as kibanTours, TourEntry, imageUrl, imageObjectPosition } from '@/services/kiban';
import {
  Clock, ArrowRight, Check, X,
  Info, Users, Mountain, ShieldCheck, Award, Flame,
  ChevronLeft, ChevronRight, Calendar, Star,
  MapPin, Languages, Ticket, Zap, AlertTriangle, HelpCircle
} from 'lucide-react';

const TourDetail: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const [tour, setTour] = useState<TourEntry | null>(null);
  const [recommended, setRecommended] = useState<TourEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { completeTransition, transitionState } = useSharedImage();

  useEffect(() => {
    if (slug) loadTour();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadTour = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const { data, error } = await kibanTours.getBySlug(slug);
      if (error || !data) {
        setTour(null);
        return;
      }
      setTour(data);
      const { data: rec } = await kibanTours.recommended(data.categories, data.slug, 3);
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
      const timer = setTimeout(() => completeTransition(), 1200);
      return () => clearTimeout(timer);
    }
  }, [transitionState.isTransitioning, completeTransition]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbf9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da6927] mx-auto mb-4"></div>
          <p className="text-brand-body/60 text-sm uppercase tracking-widest">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="pt-32 px-6 text-center min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold font-montserrat text-brand-navy mb-6 uppercase tracking-tight">
          Tour não encontrado
        </h1>
        <Link
          href="/tours"
          className="bg-[#da6927] text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0d4357] transition-all duration-300 shadow-lg"
        >
          Voltar para todos os tours
        </Link>
      </div>
    );
  }

  const gallery = [tour.cover_image, ...tour.gallery].filter(Boolean);
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
  };

  return (
    <PageTransition>
      <div className="bg-[#fffbf9] min-h-screen">
        {/* Hero */}
        <section className="relative h-[90vh] md:h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={imageUrl(tour.cover_image || gallery[0]) || '/image/placeholder.jpg'}
              alt={tour.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: imageObjectPosition(tour.cover_image || gallery[0]) }}
            />
            {/* Brand-navy overlay bottom → up for content legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d4357]/85 via-[#0d4357]/40 to-transparent"></div>
          </div>

          <motion.div
            className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full pb-16 md:pb-24"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80"
              variants={staggerItem}
            >
              <Link href="/" className="hover:text-white">Início</Link>
              <span className="text-white/50">/</span>
              <Link href="/tours" className="hover:text-white">Tours</Link>
              <span className="text-white/50">/</span>
              <span className="text-white truncate max-w-[200px]">{tour.title}</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat text-white leading-[1.05] tracking-tight uppercase max-w-5xl"
              variants={staggerItem}
            >
              {tour.title}
            </motion.h1>

            {tour.subtitle && (
              <motion.p
                className="mt-6 text-xl md:text-2xl text-white/90 font-light max-w-3xl"
                variants={staggerItem}
              >
                {tour.subtitle}
              </motion.p>
            )}

          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-24 md:py-32 bg-[#fffbf9] relative">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

              {/* Left: Main Content */}
              <div className="lg:col-span-8 space-y-24">

                {/* Description */}
                <div>
                  <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">A Experiência</span>
                  <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy mb-8 tracking-tight leading-tight uppercase">
                    {tour.title}
                  </h2>
                  {tour.short_description && (
                    <p className="text-lg md:text-xl text-brand-body/90 font-light leading-relaxed mb-8">
                      {tour.short_description}
                    </p>
                  )}
                  {tour.full_description && (
                    <div
                      className="prose prose-lg max-w-none text-base md:text-lg text-brand-body/80 font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tour.full_description }}
                    />
                  )}

                </div>

                {/* Gallery */}
                {gallery.length > 1 && (
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                      <div>
                        <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">
                          Diário Visual
                        </span>
                        <h3 className="text-3xl md:text-5xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">
                          Galeria
                        </h3>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => scrollSlider('left')} className="w-12 h-12 rounded-full border border-[#0d4357]/10 flex items-center justify-center bg-white shadow-sm hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all">
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scrollSlider('right')} className="w-12 h-12 rounded-full border border-[#0d4357]/10 flex items-center justify-center bg-white shadow-sm hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={sliderRef}
                      className="flex overflow-x-auto gap-4 snap-x snap-mandatory cursor-grab rounded-3xl"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {gallery.map((img, i) => (
                        <div key={i} className="flex-none w-[90%] md:w-[60%] snap-start aspect-[3/4] overflow-hidden rounded-3xl">
                          <img src={img} alt={`${tour.title} - ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights — visual cards with gallery photos */}
                {tour.highlights.length > 0 && (
                  <div>
                    <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">Destaques</span>
                    <h3 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy mb-10 uppercase tracking-tight">
                      O que vai viver
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tour.highlights.map((h, i) => {
                        const img = tour.gallery?.[i] || tour.gallery?.[i % (tour.gallery?.length || 1)] || tour.cover_image || '/image/placeholder.jpg';
                        return (
                          <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                            <img
                              src={img}
                              alt={h}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0d4357]/95 via-[#0d4357]/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <span className="text-[#da6927] text-[10px] font-bold font-montserrat uppercase tracking-[0.3em] mb-2 block">
                                {String(i + 1).padStart(2, '0')} / {String(tour.highlights.length).padStart(2, '0')}
                              </span>
                              <h4 className="text-lg md:text-xl font-bold font-montserrat text-white tracking-tight leading-tight">
                                {h}
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {tour.itinerary && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-brand-navy mb-10 uppercase tracking-[0.15em]">
                      O Itinerário
                    </h3>
                    <div
                      className="prose prose-lg max-w-none text-brand-body/80 font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tour.itinerary }}
                    />
                  </div>
                )}

                {/* Meeting point + pickup */}
                {(tour.meeting_point || tour.pickup_zones.length > 0) && (
                  <div className="bg-white border border-slate-100 rounded-3xl p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <MapPin className="text-[#da6927] flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="text-2xl font-bold font-montserrat text-brand-navy mb-2 uppercase tracking-tight">
                          Ponto de Encontro
                        </h3>
                        {tour.meeting_point && (
                          <div
                            className="prose max-w-none text-brand-body/80 text-base font-light leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: tour.meeting_point }}
                          />
                        )}
                      </div>
                    </div>

                    {tour.pickup_zones.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-body/80 mb-4">Zonas de Recolha</p>
                        <div className="flex flex-wrap gap-2">
                          {tour.pickup_zones.map((zone, i) => (
                            <span key={i} className="bg-[#da6927]/10 text-[#da6927] text-sm px-4 py-2 rounded-full font-medium">
                              {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Inclusions / Exclusions */}
                {(tour.inclusions.length > 0 || tour.exclusions.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {tour.inclusions.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-8 flex items-center gap-2">
                          <Check size={14} className="text-[#da6927]" /> Incluído
                        </h4>
                        <ul className="space-y-4">
                          {tour.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-brand-body/80 font-light">
                              <Check className="text-[#da6927] flex-shrink-0 mt-1" size={16} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tour.exclusions.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-8 flex items-center gap-2">
                          <X size={14} className="text-red-500" /> Não incluído
                        </h4>
                        <ul className="space-y-4">
                          {tour.exclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-brand-body/80 font-light">
                              <X className="text-red-500 flex-shrink-0 mt-1" size={16} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* What to bring */}
                {tour.what_to_bring.length > 0 && (
                  <div className="bg-[#fcfcf9] border border-slate-100 rounded-3xl p-10">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-6">
                      O que trazer
                    </h4>
                    <ul className="flex flex-wrap gap-3">
                      {tour.what_to_bring.map((item, i) => (
                        <li key={i} className="bg-white border border-slate-200 text-brand-body/80 text-sm px-4 py-2 rounded-full font-light">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Physical requirements & Health */}
                {(tour.physical_requirements || tour.health_restrictions.length > 0) && (
                  <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-montserrat text-brand-navy mb-4 uppercase tracking-tight">
                          Requisitos e Restrições
                        </h3>
                        {tour.physical_requirements && (
                          <p className="text-brand-body/80 text-base font-light leading-relaxed mb-6">
                            {tour.physical_requirements}
                          </p>
                        )}
                        {tour.health_restrictions.length > 0 && (
                          <>
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-body/80 mb-3">Não recomendado para:</p>
                            <ul className="space-y-2">
                              {tour.health_restrictions.map((r, i) => (
                                <li key={i} className="text-brand-body/70 text-sm font-light flex items-start gap-2">
                                  <span className="text-amber-600">•</span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {tour.additional_info && (
                  <div className="border-l-4 border-[#da6927] pl-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-body/80 mb-3">Informação adicional</p>
                    <div
                      className="prose max-w-none text-brand-body/80 text-base font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tour.additional_info }}
                    />
                  </div>
                )}

                {/* Cancellation Policy */}
                {tour.cancellation_policy.length > 0 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-brand-navy mb-8 uppercase tracking-tight">
                      Política de Cancelamento
                    </h3>
                    <div className="space-y-3">
                      {tour.cancellation_policy.map((tier, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl">
                          <span className="text-brand-body/80 font-light">
                            {tier.label || `Cancelamento com ${tier.hours_before}h+ de antecedência`}
                          </span>
                          <span className="font-bold text-brand-navy">
                            {tier.refund_percent}% reembolso
                          </span>
                        </div>
                      ))}
                    </div>
                    {tour.weather_policy && tour.weather_policy !== 'none' && (
                      <p className="text-sm text-brand-body/60 font-light mt-4">
                        {tour.weather_policy === 'full_refund'
                          ? 'Em caso de cancelamento por condições meteorológicas, reembolso total.'
                          : tour.weather_policy === 'reschedule'
                          ? 'Em caso de cancelamento por condições meteorológicas, a tour pode ser remarcada.'
                          : tour.weather_policy === 'partial_refund'
                          ? 'Em caso de cancelamento por condições meteorológicas, reembolso parcial.'
                          : tour.weather_policy}
                      </p>
                    )}
                  </div>
                )}

                {/* FAQ */}
                {tour.faq.length > 0 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-brand-navy mb-8 uppercase tracking-tight flex items-center gap-3">
                      <HelpCircle className="text-[#da6927]" size={28} /> Perguntas Frequentes
                    </h3>
                    <div className="space-y-3">
                      {tour.faq.map((item, i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                          >
                            <span className="font-bold text-brand-navy pr-4">{item.question}</span>
                            <ChevronRight
                              size={20}
                              className={`text-[#da6927] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`}
                            />
                          </button>
                          {openFaq === i && (
                            <div className="px-6 pb-6 text-brand-body/80 font-light leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fine print */}
                {tour.fine_print && (
                  <div className="border-t border-slate-100 pt-12">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-body/60 mb-4">Letra Miúda</p>
                    <div
                      className="prose prose-sm max-w-none text-xs text-brand-body/60 font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tour.fine_print }}
                    />
                  </div>
                )}
              </div>

              {/* Right: Sticky Booking Card — sits in-flow, sticks to top when scrolling */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32 z-20">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-brand-navy uppercase tracking-tight mb-6">
                      Reserva
                    </h3>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-brand-body/60 uppercase tracking-wider">Desde</span>
                        <span className="text-4xl md:text-5xl font-bold font-montserrat text-brand-navy tracking-tighter">
                          €{tour.price_adult}
                        </span>
                        <span className="text-xs text-brand-body/60 uppercase tracking-wider">/ adulto</span>
                      </div>
                      {tour.price_child > 0 && (
                        <p className="text-sm text-brand-body/70 font-light mt-2">
                          €{tour.price_child} / criança {tour.child_age_range && `(${tour.child_age_range})`}
                        </p>
                      )}
                    </div>

                    {/* Perks — moved from main content */}
                    {(tour.instant_confirmation || tour.is_digital_ticket || tour.languages.length > 0) && (
                      <div className="space-y-3 mb-8 pb-8 border-b border-slate-100">
                        {tour.instant_confirmation && (
                          <div className="flex items-center gap-3">
                            <Zap className="text-[#da6927] flex-shrink-0" size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Confirmação Imediata</span>
                          </div>
                        )}
                        {tour.is_digital_ticket && (
                          <div className="flex items-center gap-3">
                            <Ticket className="text-[#da6927] flex-shrink-0" size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Bilhete Digital</span>
                          </div>
                        )}
                        {tour.languages.length > 0 && (
                          <div className="flex items-center gap-3">
                            <Languages className="text-[#da6927] flex-shrink-0" size={16} />
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Idiomas</span>
                              <span className="text-xs text-brand-body/60 uppercase tracking-wider">{tour.languages.join(', ')}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-4 mb-10">
                      {tour.capacity > 0 && (
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <Users size={16} className="text-[#da6927]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">Capacidade</span>
                          </div>
                          <span className="font-bold text-brand-navy text-xs">Até {tour.capacity}</span>
                        </div>
                      )}
                    </div>

                    {/* Banners: direct-booking discount + likely to sell out */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center bg-[#da6927] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        10% Desconto — Reserva Direta
                      </span>
                      {tour.likely_to_sell_out && (
                        <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                          <Flame size={10} /> Quase esgotado
                        </span>
                      )}
                    </div>

                    <MagneticButton
                      as="a"
                      href="/contacts"
                      magneticType="dark"
                      strength={0.35}
                      className="flex items-center justify-center gap-3 w-full bg-[#0d4357] hover:bg-[#da6927] text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-md"
                    >
                      <span>Reservar Agora</span>
                      <ArrowRight size={14} />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended */}
        {recommended.length > 0 && (
          <section className="py-32 bg-[#fffbf9]">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">Continue a Explorar</span>
                  <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">
                    Mais Aventuras
                  </h2>
                </div>
                <Link href="/tours" className="text-brand-navy font-bold uppercase tracking-widest text-[11px] border-b border-[#0d4357] pb-2 hover:text-[#da6927] hover:border-[#da6927]">
                  Ver Todos os Tours
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {recommended.map((rec) => (
                  <Link key={rec.slug} href={`/tours/${rec.slug}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                      <img
                        src={rec.cover_image || rec.gallery?.[0] || '/image/placeholder.jpg'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        alt={rec.title}
                      />
                    </div>
                    <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest block mb-3">
                      {formatDuration(rec.duration_minutes)}
                    </span>
                    <h4 className="text-2xl font-bold font-montserrat text-brand-navy tracking-tight group-hover:text-[#da6927] transition-colors uppercase">
                      {rec.title}
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

export default TourDetail;
