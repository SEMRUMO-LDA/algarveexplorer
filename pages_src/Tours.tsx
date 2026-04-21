'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Star, Clock, Users, Award, Flame } from 'lucide-react';
import AnimatedBlob from '@/components/AnimatedBlob';
import PageTransition from '@/components/PageTransition';
import FooterCTA from '@/components/FooterCTA';
import { motion } from 'framer-motion';
import { tours as kibanTours, TourEntry, imageUrl, imageObjectPosition } from '@/services/kiban';

const Tours: React.FC = () => {
  const [tours, setTours] = useState<TourEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const { data, error } = await kibanTours.list();
      if (error) throw error;
      setTours(data);
    } catch (error) {
      console.error('Error loading tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#fffbf9] min-h-screen overflow-x-hidden">
        <section className="relative pt-32 pb-20 md:pt-64 md:pb-32 overflow-hidden bg-white">
          <div className="absolute inset-0 pointer-events-none">
            <img src="/image/tours-toppage.jpg" alt="Tours" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
          </div>
          <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
            <div className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              <Link href="/" className="hover:text-[#da6927] transition-colors">Início</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/80">Tours</span>
            </div>

            <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
              <Plus size={16} />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">Explorar</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
              AS AVENTURAS
            </h1>
            <p className="text-white max-w-2xl text-lg md:text-xl font-light leading-relaxed">
              De picos desafiantes de montanha a caminhos costeiros serenos, os nossos tours são concebidos para quem aprecia a natureza e a aventura nas suas formas mais puras.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
            <div className="max-w-4xl">
              <div className="flex items-center mb-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#da6927]">AVENTURAS SELECIONADAS</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat text-brand-navy mb-12 tracking-tight uppercase leading-[1.1]">
                Há experiências que levamos connosco para a vida toda.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 mt-24">
              {[
                { label: 'Aventuras Guiadas', value: '150+' },
                { label: 'Trilhos Explorados', value: '2,400km' },
                { label: 'Exploradores Felizes', value: '5,000+' },
                { label: '+ 10 anos de experiência', value: '2016' }
              ].map((stat, i) => (
                <div key={i} className="border-l border-slate-100 pl-8">
                  <span className="text-[#da6927] font-bold text-3xl md:text-4xl font-montserrat block mb-2">{stat.value}</span>
                  <span className="text-brand-body/40 text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pb-40 overflow-hidden">
          <AnimatedBlob className="top-[15%] -right-32" opacity={0.35} size="w-[700px] h-[700px]" duration="50s" blur="150px" />
          <AnimatedBlob className="bottom-[20%] -left-24" opacity={0.25} size="w-[500px] h-[500px]" duration="40s" delay="2s" blur="120px" alternate />

          <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da6927] mx-auto mb-4"></div>
                  <p className="text-brand-body/60 text-sm uppercase tracking-widest">A carregar tours...</p>
                </div>
              </div>
            ) : tours.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-brand-body/60 text-lg">Nenhum tour disponível no momento.</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {tours.map((tour) => (
                  <motion.div key={tour.slug} variants={cardVariants}>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="group block bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-white h-full overflow-hidden"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-slate-100">
                        <img
                          src={imageUrl(tour.cover_image || tour.gallery?.[0]) || '/image/placeholder.jpg'}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          style={{ objectPosition: imageObjectPosition(tour.cover_image || tour.gallery?.[0]) }}
                          loading="lazy"
                          decoding="async"
                        />

                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {tour.difficulty_level && (
                            <span className="bg-[#0d4357] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg w-fit">
                              {tour.difficulty_level}
                            </span>
                          )}
                          {tour.travellers_choice && (
                            <span className="bg-[#da6927] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg w-fit flex items-center gap-1">
                              <Award size={10} /> Travellers&apos; Choice
                            </span>
                          )}
                          {tour.likely_to_sell_out && (
                            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg w-fit flex items-center gap-1">
                              <Flame size={10} /> Muito Procurado
                            </span>
                          )}
                        </div>

                        {tour.rating > 0 && (
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <Star size={12} className="fill-[#da6927] text-[#da6927]" />
                            <span className="text-[12px] font-bold text-brand-navy">{tour.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          {tour.duration_minutes > 0 && (
                            <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <Clock size={12} /> {formatDuration(tour.duration_minutes)}
                            </span>
                          )}
                          {tour.capacity > 0 && (
                            <span className="text-brand-body/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <Users size={12} /> Até {tour.capacity}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-2 line-clamp-2">
                          {tour.title}
                        </h3>

                        {tour.subtitle && (
                          <p className="text-brand-body/70 text-sm font-light mb-2 line-clamp-1">
                            {tour.subtitle}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex flex-col">
                            {tour.instant_confirmation && (
                              <span className="text-[8px] font-bold uppercase tracking-wider text-green-600 mb-1">
                                ✓ Confirmação imediata
                              </span>
                            )}
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-body/60 mb-0.5">
                              A partir de
                            </span>
                            <span className="text-xl md:text-2xl font-bold font-montserrat text-brand-navy tracking-tight">
                              €{tour.price_adult}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-brand-body group-hover:text-[#da6927] transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Explorar</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        <FooterCTA />
      </div>
    </PageTransition>
  );
};

export default Tours;
