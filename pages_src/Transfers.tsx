'use client';

import React, { useEffect, useState } from 'react';
import { Truck, Users, Luggage, ShieldCheck, Plus, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/LanguageContext';
import FooterCTA from '@/components/FooterCTA';
import { experiences as kibanExperiences, ExperienceEntry } from '@/services/kiban';
import { Link } from '@/i18n/navigation';

const Transfers: React.FC = () => {
  const { language } = useLanguage();
  const [transfers, setTransfers] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('transfers');
  const tCard = useTranslations('transfers.card');
  const tQuote = useTranslations('transfers.quote');
  const tNav = useTranslations('nav');

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    try {
      const { data, error } = await kibanExperiences.transfers();
      if (error) throw error;
      setTransfers(data);
    } catch (error) {
      console.error('Error loading transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fffbf9] min-h-screen overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-64 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/image/transfer.jpg"
            alt="Airport Transfer Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-[#da6927] transition-colors">{tNav('home')}</Link>
            <span className="text-white/20">/</span>
            <span className="inline-flex items-center bg-[#fff1e6] text-[#da6927] px-4 py-1.5 rounded-full normal-case tracking-normal font-semibold text-xs">{t('breadcrumbCurrent')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">{t('kicker')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            {t('title')}
          </h1>
          <p className="text-white max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da6927] mx-auto mb-4"></div>
                <p className="text-brand-body/60 text-sm uppercase tracking-widest">
                  {t('loading')}
                </p>
              </div>
            </div>
          ) : transfers.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-brand-body/60 text-lg">
                {t('empty')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {transfers.map((service) => (
                <div key={service.id} className="group flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all p-8 md:p-12 rounded-3xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-12">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4 text-[#da6927]">
                        <Truck size={20} />
                        <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{tCard('kicker')}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold font-montserrat text-brand-navy tracking-tight group-hover:text-[#da6927] transition-colors">
                        {language === 'pt' ? service.title_pt : service.title_en}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-brand-body/60 mb-2">{tCard('fromLabel')}</span>
                      <span className="text-4xl font-bold font-montserrat text-brand-navy tracking-tighter">€{service.price}</span>
                    </div>
                  </div>

                  <p className="text-brand-navy/60 text-lg font-light leading-relaxed mb-12 max-w-md">
                    {language === 'pt' ? service.description_pt : service.description_en}
                  </p>

                  <div className="flex flex-wrap gap-8 mb-16">
                    {service.max_participants && (
                      <div className="flex items-center space-x-3">
                        <Users size={18} className="text-[#da6927]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-navy">
                          {tCard('upToParticipants', { n: service.max_participants })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Luggage size={18} className="text-[#da6927]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy">{tCard('gearSpace')}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href="/contacts"
                      className="inline-flex items-center space-x-3 bg-[#0d4357] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#da6927] transition-all duration-300 shadow-xl group/btn focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                      <span>{tCard('bookCta')}</span>
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-32 bg-[#0d4357] p-12 md:p-24 rounded-3xl relative overflow-hidden text-white">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-10 text-white/30">
                  <span className="text-xl font-light leading-none">+</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{tQuote('kicker')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-montserrat mb-12 tracking-tight leading-tight whitespace-pre-line">
                  {tQuote('title')}
                </h2>
                <p className="text-white/50 text-xl font-light leading-relaxed mb-12">
                  {tQuote('body')}
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={20} className="text-[#da6927]" />
                    <span className="text-xs font-bold uppercase tracking-widest">{tQuote('insurance')}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Link
                  href="/contacts"
                  className="bg-[#da6927] text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-brand-body transition-all duration-300 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                >
                  {tQuote('cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default Transfers;
