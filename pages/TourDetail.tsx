import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOURS } from '../constants';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';
import {
  MapPin, Clock,
  Download, ArrowRight, Check,
  Info, Users, Mountain, ShieldCheck,
  ChevronLeft, ChevronRight, Calendar
} from 'lucide-react';

const TourDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const tour = TOURS.find(t => t.slug === slug);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!tour) {
    return (
      <div className="pt-32 px-6 text-center min-h-screen bg-[#fdfdfb] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold font-montserrat text-[#0d4357] mb-6 uppercase tracking-tight">
          {language === 'pt' ? 'Experiência Não Encontrada' : 'Experience Not Found'}
        </h1>
        <Link
          to="/tours"
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

  const isAlbufeiraHorseRiding = tour.slug === 'albufeira-hidden-gems-horse-riding' || tour.slug === 'horse-riding-tour-albufeira-pickup';
  const isDedicatedHorseRiding = tour.slug === 'horse-riding-tour-albufeira-pickup';
  const isSevenValleysTour = tour.slug === 'benagil-marinha-7-valleys-tour' || tour.slug === 'seven-hanging-valleys-hiking-albufeira';
  const isSevenValleysHikeOnly = tour.slug === 'seven-hanging-valleys-hiking-albufeira';

  const displayTitle = language === 'pt' ? tour.title_pt : tour.title;
  const displayDuration = language === 'pt' ? tour.duration_pt : tour.duration;
  const displayDifficulty = language === 'pt' ? tour.difficulty_pt : tour.difficulty;
  const displayDesc = language === 'pt' ? tour.description_pt : tour.description;
  const displayAgeRange = language === 'pt' ? tour.ageRange_pt : tour.ageRange;

  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      {/* Editorial Hero */}
      <section className="relative h-[80vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={tour.image}
            className="w-full h-full object-cover"
            alt={`Breathtaking overview of ${displayTitle}`}
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfdfb] via-transparent to-transparent"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full pb-20">
          <div className="max-w-5xl">
            <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/tours" className="hover:text-white transition-colors">{t('nav.tours')}</Link>
              <span>/</span>
              <span className="text-white">{displayTitle}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat text-white leading-[1.1] tracking-tight mb-8 drop-shadow-sm uppercase">
              {displayTitle}
            </h1>
            <div className="flex items-center gap-3 text-white">
              <div className="bg-[#da6927] p-2 rounded-full">
                <MapPin size={16} />
              </div>
              <span className="text-lg md:text-xl font-light uppercase tracking-widest">Algarve, Portugal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 md:py-32 bg-[#fdfdfb] relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative min-h-screen">

            {/* Left: Main Content */}
            <div className="lg:col-span-8 space-y-32">
              <div>
                <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">
                  {t('tourDetail.experience.eyebrow')}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-[#0d4357] mb-12 tracking-tight leading-tight uppercase">
                  {displayTitle}
                </h2>
                <div className="prose prose-xl text-[#0d4357]/60 font-light leading-relaxed">
                  {(isAlbufeiraHorseRiding || isSevenValleysTour) ? (
                    <div className="text-xl md:text-2xl text-[#0d4357]/80 font-normal leading-relaxed space-y-10 whitespace-pre-line">
                      {displayDesc}
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <p className="text-2xl text-[#0d4357]/80 font-normal leading-relaxed">
                        {displayDesc}
                      </p>
                    </div>
                  )}
                </div>

                {(isAlbufeiraHorseRiding || isSevenValleysTour) && (
                  <div className="mt-16 bg-[#fdfdfb] border border-slate-100 p-10 rounded-2xl flex items-start gap-6">
                    <div className="bg-[#da6927]/10 p-3 rounded-full">
                      <Info className="text-[#da6927]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0d4357] uppercase tracking-widest mb-2">
                        {language === 'pt' ? 'Informação Importante' : 'Important to Note'}
                      </p>
                      <p className="text-[#0d4357]/60 text-lg font-light leading-relaxed m-0">
                        {isDedicatedHorseRiding ? (
                          language === 'pt' ? "Recolha gratuita incluída em Albufeira. Adequado para todos os níveis de experiência. Idades 6-65." : "Complimentary pickup included from Albufeira. Suitable for all experience levels. Ages 6-65."
                        ) : isSevenValleysHikeOnly ? (
                          language === 'pt' ? "Começamos no Farol de Alfanzina. Passe pela praia do Carvalho e entre por um túnel de milhões de anos. Idades 6-65." : "Starting at Alfanzina Lighthouse. Pass by Carvalho beach and enter through a tunnel millions of years old. Ages 6-65."
                        ) : (
                          language === 'pt' ? "Recolha disponível em Albufeira e Armação de Pêra. Explore as maravilhas naturais do Algarve sem estar preso a um horário de barco." : "Pick up available in Albufeira and Armação de Pêra. Experience the Algarve's natural wonders without being tied to a boat schedule."
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlights Slider */}
              <div className="pt-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-10">
                  <div>
                    <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">
                      {language === 'pt' ? 'Diário Visual' : 'Visual Diary'}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold font-montserrat text-[#0d4357] tracking-tight uppercase">
                      {t('tourDetail.highlights')}
                    </h3>
                  </div>
                  <div className="flex space-x-3 pb-2">
                    <button
                      onClick={() => scrollSlider('left')}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#0d4357]/10 flex items-center justify-center text-[#0d4357] hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all duration-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                      aria-label="Scroll highlights left"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => scrollSlider('right')}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#0d4357]/10 flex items-center justify-center text-[#0d4357] hover:bg-[#da6927] hover:border-[#da6927] hover:text-white transition-all duration-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
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
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex-none w-[90%] md:w-[48%] snap-start group relative aspect-[3/4] overflow-hidden rounded-[2.5rem]">
                        <img
                          src={h.image}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          alt={`Highlight: ${language === 'pt' ? h.text_pt : h.text}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                          <span className="text-[#da6927] text-[10px] md:text-[11px] font-bold font-montserrat uppercase tracking-[0.3em] mb-2 block">
                            {i + 1} / {tour.highlights.length}
                          </span>
                          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold font-montserrat text-white tracking-tight uppercase leading-tight">
                            {language === 'pt' ? h.text_pt : h.text}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="text-2xl font-bold font-montserrat text-[#0d4357] mb-16 uppercase tracking-[0.3em]">
                  {language === 'pt' ? 'O Itinerário' : 'The Itinerary'}
                </h3>
                <div className="space-y-0 relative border-l border-slate-100 ml-4">
                  {[
                    {
                      title: isDedicatedHorseRiding ? (language === 'pt' ? 'Encontro e Preparação' : 'Meet & Prepare') : isSevenValleysHikeOnly ? (language === 'pt' ? 'Farol de Alfanzina' : 'Alfanzina Lighthouse') : (language === 'pt' ? 'Manhã de Descoberta' : 'Morning Discovery'),
                      desc: isDedicatedHorseRiding ? (language === 'pt' ? 'Recolha em Albufeira e introdução aos nossos cavalos gentis.' : 'Pickup in Albufeira and introduction to our gentle horses.') : isSevenValleysHikeOnly ? (language === 'pt' ? 'Começamos no icónico farol com vistas panorâmicas sobre as falésias.' : 'Starting at the iconic lighthouse with sweeping views over the cliffs.') : (language === 'pt' ? 'Explorar praias deslumbrantes e jóias escondidas conhecidas apenas pelos locais.' : 'Explore stunning beaches and hidden gems known only to the locals.')
                    },
                    {
                      title: isDedicatedHorseRiding ? (language === 'pt' ? 'Trilho da Lagoa' : 'Lagoon Trail') : isSevenValleysHikeOnly ? (language === 'pt' ? 'Praia do Carvalho e Túnel' : 'Carvalho Beach & Tunnel') : (language === 'pt' ? 'Imersão Regional' : 'Regional Immersion'),
                      desc: isDedicatedHorseRiding ? (language === 'pt' ? 'Passeio pela natureza com avistamento de animais selvagens e vistas da lagoa.' : 'Ride through nature with wild animal sightings and lagoon vistas.') : isSevenValleysHikeOnly ? (language === 'pt' ? 'Experiência imersiva ao entrar na praia através de um túnel com milhões de anos.' : 'Immersive experience entering the beach through a tunnel millions of years old.') : (language === 'pt' ? 'Uma experiência focada no sabor e na cultura local.' : 'A mid-day experience focused on local flavor.')
                    },
                    {
                      title: isDedicatedHorseRiding ? (language === 'pt' ? 'Conclusão Panorâmica' : 'Scenic Conclusion') : isSevenValleysHikeOnly ? (language === 'pt' ? 'Marinha e Vistas do Topo' : 'Marinha & Top Vistas') : (language === 'pt' ? 'O Caminho Final' : 'The Final Path'),
                      desc: isDedicatedHorseRiding ? (language === 'pt' ? 'Uma conclusão tranquila para libertar o seu sentido de maravilha.' : 'A peaceful conclusion to unleash your sense of wonder.') : isSevenValleysHikeOnly ? (language === 'pt' ? 'Explore os Sete Vales Suspensos e relaxe com as vistas da Praia da Marinha.' : 'Explore the Seven Hanging Valleys and relax with the vistas of Marinha Beach.') : (language === 'pt' ? 'Um final relaxante seguindo caminhos cénicos.' : 'A relaxing finish following scenic paths.')
                    }
                  ].map((item, i) => (
                    <div key={i} className="pl-12 pb-20 relative last:pb-0 group">
                      <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-white border-2 border-[#da6927] rounded-full group-hover:scale-125 transition-transform"></div>
                      <h4 className="text-2xl font-bold font-montserrat text-[#0d4357] mb-4 tracking-tight uppercase">{item.title}</h4>
                      <p className="text-[#0d4357]/50 text-lg font-light leading-relaxed max-w-2xl">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Preparation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-24 border-t border-slate-100">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40 mb-10">
                    {t('tourDetail.inclusions.title')}
                  </h4>
                  <ul className="space-y-5">
                    {[
                      t('tourDetail.inclusions.guide'),
                      isAlbufeiraHorseRiding ? (language === 'pt' ? 'Equipamento de Equitação' : 'Horse Riding Equipment') : (language === 'pt' ? 'Apoio em Trilho' : 'Trail Support'),
                      language === 'pt' ? 'Seguro de Aventura' : 'Adventure Insurance',
                      t('tourDetail.inclusions.snack')
                    ].map((item, i) => (
                      <li key={i} className="flex items-center space-x-4 text-[#0d4357]/70 font-medium">
                        <span className="flex-shrink-0"><Check className="text-[#da6927]" size={18} /></span>
                        <span className="text-sm uppercase tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40 mb-10">
                    {language === 'pt' ? 'Preparação' : 'Preparation'}
                  </h4>
                  <p className="text-[#0d4357]/50 text-sm font-light leading-relaxed">
                    {language === 'pt' ? "Recomendamos roupa leve e respirável e calçado resistente. A proteção solar é essencial durante todo o ano. Todo o equipamento fornecido é inspecionado antes de cada passeio para sua segurança." : "We recommend light, breathable clothing and sturdy footwear. Sun protection is essential year-round. All gear provided is inspected before every tour for your safety."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Sticky Booking Card */}
            <div className="lg:col-span-4 relative h-full flex flex-col">
              <div className="sticky top-[20%] z-20 transition-all duration-300">
                <div className="bg-[#fcfcf9] p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="mb-14">
                    <p className="text-[#0d4357]/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                      {t('tourDetail.booking')}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-7xl md:text-8xl font-bold font-montserrat text-[#0d4357] tracking-tighter">€{tour.price}</span>
                      <span className="text-[#0d4357]/30 text-xs font-bold uppercase tracking-widest">P.P.</span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-14">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Clock size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{language === 'pt' ? 'DURAÇÃO' : 'DURATION'}</span>
                      </div>
                      <span className="font-bold text-[#0d4357] text-xs uppercase tracking-tight">{displayDuration}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Mountain size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0d4357]/40">{language === 'pt' ? 'NÍVEL' : 'LEVEL'}</span>
                      </div>
                      <span className="font-bold text-[#0d4357] text-xs uppercase tracking-tight">
                        {displayDifficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Users size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{t('tourDetail.maxSize')}</span>
                      </div>
                      <span className="font-bold text-[#0d4357] text-xs uppercase tracking-tight">MAX {tour.maxGroupSize || 21} PERSONS</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <Calendar size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{t('tourDetail.ageRange')}</span>
                      </div>
                      <span className="font-bold text-[#0d4357] text-xs uppercase tracking-tight">{displayAgeRange || '6-65'}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <ShieldCheck size={18} className="text-[#da6927]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{language === 'pt' ? 'GUIA' : 'GUIDE'}</span>
                      </div>
                      <span className="font-bold text-[#0d4357] text-xs uppercase tracking-tight">{language === 'pt' ? 'CERTIFICADO' : 'CERTIFIED'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link
                      to="/contacts"
                      className="flex items-center justify-center space-x-3 w-full bg-[#0d4357] hover:bg-[#da6927] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-md group/btn focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <span>{t('tourDetail.buttons.book')}</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      className="flex items-center justify-center space-x-3 w-full bg-white text-[#0d4357]/40 py-6 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] border border-slate-100 hover:bg-[#0d4357] hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <Download size={14} />
                      <span>{t('tourDetail.buttons.download')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-32 md:py-48 bg-[#fdfdfb]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">
                {t('tourDetail.recommended.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat text-[#0d4357] tracking-tight uppercase">
                {t('tourDetail.recommended.title')}
              </h2>
            </div>
            <Link to="/tours" className="text-[#0d4357] font-bold uppercase tracking-widest text-[11px] border-b border-[#0d4357] pb-2 hover:text-[#da6927] hover:border-[#da6927] transition-all">
              {t('tourDetail.recommended.viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TOURS.filter(t => t.id !== tour.id).slice(0, 3).map((t) => (
              <Link key={t.id} to={`/tours/${t.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-8">
                  <img
                    src={t.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    alt={`Recommended tour: ${language === 'pt' ? t.title_pt : t.title}`}
                  />
                </div>
                <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-widest block mb-3">
                  {language === 'pt' ? t.duration_pt : t.duration}
                </span>
                <h4 className="text-2xl font-bold font-montserrat text-[#0d4357] tracking-tight group-hover:text-[#da6927] transition-colors uppercase">
                  {language === 'pt' ? t.title_pt : t.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default TourDetail;