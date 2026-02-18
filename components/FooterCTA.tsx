
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FooterCTA: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 md:py-40 bg-[#0d4357] text-white relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/image/the-region-hero.jpg"
                    alt="Scenic Algarve landscape"
                    className="w-full h-full object-cover opacity-40 grayscale-[0.4]"
                />
                <div className="absolute inset-0 bg-[#0d4357]/60"></div>
            </div>

            {/* Transition Gradient to Footer */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d4357] via-[#0d4357]/80 to-transparent z-0"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">{t('home.cta.eyebrow')}</span>
                <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-10 tracking-tight uppercase leading-tight">{t('home.cta.title')}</h2>
                <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    {t('home.cta.desc')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link
                        to="/tours"
                        className="inline-flex items-center justify-center space-x-4 bg-[#da6927] text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0d4357] transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                        <span>{t('home.cta.browse')}</span>
                        <ArrowRight size={16} />
                    </Link>
                    <Link
                        to="/contacts"
                        className="inline-flex items-center justify-center bg-transparent border border-white/20 text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                        {t('home.cta.contact')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
