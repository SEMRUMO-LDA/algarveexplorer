'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Sun, CloudRain, Trees, ArrowRight, ArrowLeft, Plus, Waves } from 'lucide-react';
import FooterCTA from '@/components/FooterCTA';
import AnimatedBlob from '@/components/AnimatedBlob';
import ParallaxCard from '@/components/ParallaxCard';

const Algarve: React.FC = () => {
  const seasonsSliderRef = useRef<HTMLDivElement>(null);
  const [activeSeason, setActiveSeason] = useState(0);

  const seasons = [
    { icon: <Trees size={32} />, title: 'Primavera', subtitle: 'MAR - MAI', desc: 'Uma tapeçaria de flores silvestres. As colinas são luxuriantes e o ar está cheio do perfume da esteva e da alfazema.' },
    { icon: <Sun size={32} />, title: 'Verão', subtitle: 'JUN - AGO', desc: 'Longos dias ensolarados. Ideal para explorações de manhã cedo seguidas de mergulhos refrescantes em piscinas de rios escondidos.' },
    { icon: <Waves size={32} />, title: 'Outono', subtitle: 'SET - NOV', desc: "A 'Estação Dourada'. Luz suave, águas atlânticas quentes e a temperatura perfeita para longas caminhadas." },
    { icon: <CloudRain size={32} />, title: 'Inverno', subtitle: 'DEZ - FEV', desc: 'Calmo, fresco e límpido. Enquanto o Norte da Europa está congelado, os trilhos do Algarve permanecem convidativos e serenos.' }
  ];

  const handleSeasonsScroll = () => {
    if (seasonsSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = seasonsSliderRef.current;
      const scrollRatio = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      const index = Math.max(0, Math.min(seasons.length - 1, Math.round(scrollRatio * (seasons.length - 1))));
      setActiveSeason(index);
    }
  };

  const scrollSeasons = (direction: 'left' | 'right') => {
    if (seasonsSliderRef.current) {
      const { clientWidth } = seasonsSliderRef.current;
      const move = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
      seasonsSliderRef.current.scrollBy({ left: move, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fffbf9] min-h-screen overflow-x-hidden">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="relative pt-32 pb-20 md:pt-64 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/image/the-region-hero.jpg"
            alt="The Algarve Region"
            className="w-full h-full object-cover"
          />
          {/* Scrim Overlay - Editorial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-[#da6927] transition-colors">Início</Link>
            <span className="text-white/20">/</span>
            <span className="inline-flex items-center bg-[#fff1e6] text-[#da6927] px-4 py-1.5 rounded-full normal-case tracking-normal font-semibold text-xs">O Algarve</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">Sul de Portugal</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            UM RECANTO<br />PARA A ALMA
          </h1>
          <p className="font-sans text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-12">
            Das dramáticas falésias atlânticas aos antigos picos de Monchique, o Algarve oferece uma diversidade de terreno que convida à exploração lenta e à ligação profunda com a natureza.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="pt-24 md:pt-40 pb-12 md:pb-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <ParallaxCard
                src="/image/the-region-img1.jpg"
                alt="Exploring the natural beauty of the Algarve"
                className="aspect-[4/5] overflow-hidden rounded-2xl"
                depth={0.3}
              />
              <ParallaxCard
                src="/image/the-region-img2.jpg"
                alt="Local scenery of Southern Portugal"
                className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-2/3 aspect-square border-2 border-white rounded-2xl shadow-2xl overflow-hidden"
                depth={0.7}
              />
            </div>
            <div className="lg:pl-20">
              <div className="flex items-center mb-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#da6927]">Porquê Explorar Aqui</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat text-brand-navy mb-12 tracking-tight leading-tight uppercase">
                Para além dos resorts costeiros
              </h2>
              <div className="space-y-8 text-brand-body/90 text-lg md:text-xl font-light leading-relaxed">
                <p>O Algarve é mundialmente famoso pelas suas praias douradas, mas o seu verdadeiro coração reside no interior. O &quot;Barrocal&quot; e a &quot;Serra&quot; proporcionam uma paisagem acidentada e autêntica onde o tempo parece abrandar.</p>
                <p>Focamo-nos nestas joias escondidas — as florestas de sobreiros, os caminhos de pastores e as aldeias tradicionais onde ainda se pode saborear o sabor autêntico da vida portuguesa.</p>
              </div>
              <Link
                href="/tours"
                className="mt-16 inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#da6927] transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
              >
                <span>Ver Aventuras</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Callout */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  id: "01",
                  name: 'Serra de Monchique',
                  desc: "O 'Jardim do Algarve'. Picos luxuriantes, nascentes de montanha e antigas florestas de sobreiros.",
                  image: "/image/algarve-monchique.jpeg"
                },
                {
                  id: "02",
                  name: 'O Barrocal',
                  desc: 'A faixa de calcário. Caminhos técnicos por pomares de laranjeiras, muros de pedra seca e aldeias escondidas.',
                  image: "/image/algarve-barrocal.jpeg"
                },
                {
                  id: "03",
                  name: 'Costa Vicentina',
                  desc: 'O Oeste selvagem. Falésias dramáticas, brisa marítima e caminhos esculpidos por pescadores ao longo de séculos.',
                  image: "/image/algarve-costa-vicentina.jpeg"
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
                    <span className="absolute left-0 top-0 text-[#da6927] font-bold text-2xl font-montserrat">{reg.id}</span>
                    <h4 className="text-2xl font-bold font-montserrat text-brand-navy mb-6 uppercase tracking-tight leading-none">{reg.name}</h4>
                    <p className="text-brand-body/90 font-light leading-relaxed text-lg">{reg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Insights */}
      <section className="relative py-24 md:py-40 bg-[#fffbf9] overflow-hidden">
        <AnimatedBlob 
          className="top-1/4 -left-24" 
          opacity={0.3} 
          size="w-[700px] h-[700px]"
          duration="45s"
          blendMode="multiply"
        />
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
            <div className="pr-0 lg:pr-12">
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">Todo o ano</span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat text-brand-navy mb-8 tracking-tight uppercase leading-none">Estações Distintas</h2>
              <div className="space-y-6 text-brand-body/90 text-lg font-light leading-relaxed mb-16">
                <p>O Algarve é uma região de contrastes, oferecendo experiências únicas dependendo da altura em que decidir explorar.</p>
                <p>Desde o desabrochar luxuriante da primavera até aos invernos amenos e tranquilos, cada estação revela um carácter diferente das nossas paisagens.</p>
              </div>
              
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex space-x-3">
                  <button onClick={() => scrollSeasons('left')} className="group w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0d4357]/20 flex items-center justify-center hover:bg-[#0d4357] hover:border-[#0d4357] outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <ArrowLeft size={20} strokeWidth={1.5} className="text-brand-navy group-hover:text-white group-hover:-translate-x-1 transition-all duration-500" />
                  </button>
                  <button onClick={() => scrollSeasons('right')} className="group w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0d4357]/20 flex items-center justify-center hover:bg-[#da6927] hover:border-[#da6927] outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <ArrowRight size={20} strokeWidth={1.5} className="text-brand-navy group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                  </button>
                </div>
                
                <div className="flex-1 h-[2px] bg-[#0d4357]/10 relative overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-[#da6927] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-full" style={{ width: `${((activeSeason + 1) / seasons.length) * 100}%` }} />
                </div>
                
                <div className="text-sm font-bold tracking-widest text-brand-navy font-montserrat w-16 text-right">
                  0{activeSeason + 1} <span className="text-brand-body/30">/ 0{seasons.length}</span>
                </div>
              </div>
            </div>

            <div className="relative w-full -mr-6 lg:-mr-12">
              <div
                ref={seasonsSliderRef}
                onScroll={handleSeasonsScroll}
                className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-12 px-6 lg:px-0 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {seasons.map((season, i) => {
                  const isActive = activeSeason === i;
                  return (
                  <div 
                    key={i} 
                    className={`flex-none w-[85%] sm:w-[60%] lg:w-[65%] xl:w-[55%] snap-center p-8 lg:p-12 rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between min-h-[360px]
                      ${isActive ? 'bg-[#0d4357] border-white/10 shadow-[0_20px_40px_-15px_rgba(13,67,87,0.3)] scale-100 opacity-100 translate-y-0' : 'bg-white border-[#0d4357]/10 scale-95 opacity-50 blur-[1px] hover:blur-none hover:opacity-100 translate-y-4'}
                    `}
                  >
                    <div className="mb-12 inline-flex text-[#da6927] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 origin-left">
                      {season.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold font-montserrat mb-4 uppercase tracking-tight transition-colors duration-700 ${isActive ? 'text-white' : 'text-brand-navy'}`}>{season.title}</h3>
                      <p className={`text-sm leading-relaxed font-light transition-colors duration-700 ${isActive ? 'text-white/70' : 'text-brand-body/90'}`}>{season.desc}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
};

export default Algarve;