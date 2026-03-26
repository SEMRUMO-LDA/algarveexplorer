
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-[#0d4357] text-white pt-16 md:pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Mobile: Logo and Social at top */}
        <div className="flex flex-col items-center mb-12 md:hidden">
          <img
            src="/image/algarvexplorer-logo-branco.png"
            alt="Algarve Explorer"
            className="h-10 w-auto mb-6"
          />
          <div className="flex gap-3">
            <a href="https://www.instagram.com/algarveexplorer/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/algarveexplorer" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://www.tripadvisor.com/Attraction_Review-g189112-d25463557-Reviews-Algarve_Explorer_Tours-Albufeira_Faro_District_Algarve.html" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300" aria-label="TripAdvisor">
              <img src="/image/tripadvisor-icon.png" alt="Tripadvisor" className="w-[18px] h-[18px] object-contain" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16 mb-16 md:mb-24">
          {/* Desktop: Brand & Mission - Far Left */}
          <div className="hidden md:block space-y-8 lg:w-1/4">
            <div className="flex items-center">
              <img
                src="/image/algarvexplorer-logo-branco.png"
                alt="Algarve Explorer"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white text-sm leading-relaxed font-light max-w-xs">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="https://www.instagram.com/algarveexplorer/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/algarveexplorer" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.tripadvisor.com/Attraction_Review-g189112-d25463557-Reviews-Algarve_Explorer_Tours-Albufeira_Faro_District_Algarve.html" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2" aria-label="TripAdvisor">
                <img src="/image/tripadvisor-icon.png" alt="Tripadvisor" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>

          {/* Mobile: 2 columns grid / Desktop: 3 columns */}
          <div className="flex-1 flex flex-col gap-12 md:gap-0">
            {/* 2 Columns Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-8 lg:pl-0 md:pl-0 lg:pl-32">
              {/* Quick Links */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 text-white">{t('footer.links')}</h4>
                <ul className="space-y-3 text-[11px] md:text-xs font-medium uppercase tracking-wider text-white/90">
                  <li><Link to="/tours" className="hover:text-[#da6927] transition-colors">{t('nav.tours')}</Link></li>
                  <li><Link to="/algarve" className="hover:text-[#da6927] transition-colors">{t('nav.experience')}</Link></li>
                  <li><Link to="/transfers" className="hover:text-[#da6927] transition-colors">{t('nav.logistics')}</Link></li>
                  <li><Link to="/about" className="hover:text-[#da6927] transition-colors">{t('nav.story')}</Link></li>
                  <li><Link to="/contacts" className="hover:text-[#da6927] transition-colors">{t('nav.contact')}</Link></li>
                  <li className="pt-2 border-t border-white/10">
                    <a href="#" className="hover:text-[#da6927] transition-colors">{t('footer.privacy')}</a>
                  </li>
                  <li>
                    <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="hover:text-[#da6927] transition-colors">
                      {t('footer.complaints')}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 text-white">{t('footer.contact')}</h4>
                <div className="space-y-4 text-white text-xs md:text-sm">
                  <div>
                    <a href="mailto:algarveexplorer@gmail.com" className="font-light hover:text-[#da6927] transition-colors break-all">
                      algarveexplorer@gmail.com
                    </a>
                  </div>
                  <div>
                    <a href="tel:+351968306031" className="font-light hover:text-[#da6927] transition-colors">
                      +351 968 306 031
                    </a>
                  </div>
                  <div className="pt-4">
                    <p className="text-[10px] text-white/60 font-light">
                      RNAVT nº 10899<br />
                      RNAAT nº409/2023
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter - Desktop only in 3rd column */}
              <div className="hidden md:block">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-white">
                  {t('footer.newsletter.title')}
                </h4>
                <div className="flex flex-col">
                  <p className="text-white text-sm leading-relaxed font-light mb-6 max-w-sm">
                    {t('footer.newsletter.desc')}
                  </p>
                  <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder={t('footer.newsletter.placeholder')}
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#da6927] transition-all placeholder:text-white/20"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 px-6 bg-[#da6927] text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white hover:text-[#0d4357] transition-all duration-300"
                    >
                      {t('footer.newsletter.button')}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Newsletter - Mobile only full width */}
            <div className="md:hidden w-full">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white text-center">
                {t('footer.newsletter.title')}
              </h4>
              <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#da6927] transition-all placeholder:text-white/20"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-[#da6927] text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white hover:text-[#0d4357] transition-all duration-300"
                >
                  {language === 'pt' ? 'OK' : 'OK'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="border-t border-white/10 pt-8 md:pt-12 text-center text-white/50 text-[9px] md:text-[10px] font-medium uppercase tracking-wider">
          <p>
            {t('footer.devLine1')} {t('footer.devLine2')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
