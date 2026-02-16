
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0d4357] text-white pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16 mb-24">
          {/* Brand & Mission - Far Left */}
          <div className="space-y-8 lg:w-1/4">
            <div className="flex items-center">
              <img
                src="/image/algarvexplorer-logo-branco.png"
                alt="Algarve Explorer"
                className="h-10 md:h-12 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light max-w-xs">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2" aria-label="Instagram">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2" aria-label="Facebook">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#da6927] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2" aria-label="TripAdvisor">
                <span className="sr-only">TripAdvisor</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-4.5-9.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 5.5c-1.381 0-2.5-1.119-2.5-2.5h1c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5h1c0 1.381-1.119 2.5-2.5 2.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section: 3 Equally Spaced Columns with a bigger gap from the brand */}
          <div className="flex-1 flex flex-col md:flex-row lg:justify-between gap-16 lg:gap-8 lg:pl-32">
            {/* Quick Links */}
            <div className="md:flex-1">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white/30">{t('footer.links')}</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                <li><Link to="/tours" className="hover:text-[#da6927] transition-colors focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 rounded">{t('nav.tours')}</Link></li>
                <li><Link to="/algarve" className="hover:text-[#da6927] transition-colors focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 rounded">{t('nav.experience')}</Link></li>
                <li><Link to="/transfers" className="hover:text-[#da6927] transition-colors focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 rounded">{t('nav.logistics')}</Link></li>
                <li><Link to="/about" className="hover:text-[#da6927] transition-colors focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 rounded">{t('nav.story')}</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:flex-1">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white/30">{t('footer.contact')}</h4>
              <ul className="space-y-6 text-white/50 text-sm">
                <li className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">E-mail</span>
                  <a href="mailto:algarveexplorer@gmail.com" className="font-light hover:text-white transition-colors">E: algarveexplorer@gmail.com</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Phone</span>
                  <a href="tel:+351968306031" className="font-light hover:text-white transition-colors">T: +351 968 306 031</a>
                  <span className="text-[10px] text-white/20 mt-1 italic">(chamada para rede móvel nacional)</span>
                </li>
              </ul>
              <div className="mt-12 pt-12 border-t border-white/5 md:border-none md:mt-10 md:pt-0">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-white/30">{t('footer.legal')}</h4>
                <p className="text-white/50 text-[11px] leading-relaxed font-light">
                  {t('footer.member')} <br />
                  RNAVT nº 10899 / RNAAT nº409/2023
                </p>
              </div>
            </div>

            {/* Newsletter - Text aligned to the left */}
            <div className="md:flex-1">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white/30">
                {t('footer.newsletter.title')}
              </h4>
              <div className="flex flex-col">
                <p className="text-white/40 text-sm leading-relaxed font-light mb-8 max-w-sm">
                  {t('footer.newsletter.desc')}
                </p>
                <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={t('footer.newsletter.placeholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#da6927] transition-all placeholder:text-white/20"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-8 bg-[#da6927] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#0d4357] transition-all duration-300"
                  >
                    {t('footer.newsletter.button')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] gap-8">
          <p>{t('footer.dev')}</p>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t('footer.complaints')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
