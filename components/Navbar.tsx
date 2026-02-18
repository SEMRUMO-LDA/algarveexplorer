
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isHeroPage = location.pathname === '/' ||
    location.pathname.startsWith('/tours/') ||
    ['/tours', '/transfers', '/about', '/contacts', '/algarve'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHeroPage && !scrolled && !isOpen;

  const textColor = isTransparent ? 'text-white' : 'text-[#0d4357]';
  const navBg = isTransparent ? 'bg-transparent' : 'bg-white shadow-sm';
  const padding = scrolled ? 'py-4' : 'py-6 md:py-8';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${navBg} ${padding}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center relative">

          {/* Left: Menu Trigger */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center space-x-3 group focus:outline-none rounded transition-colors duration-300 ${isOpen ? 'text-white' : textColor}`}
            >
              <div className="flex flex-col space-y-1.5 w-6">
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] hidden md:block">{t('nav.menu')}</span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Link to="/" className="flex items-center group focus:outline-none rounded">
              <img
                src={isTransparent || isOpen ? "/image/algarvexplorer-logo-branco.png" : "/image/algarvexplorer-logo-azul.png"}
                alt="Algarve Explorer Logo"
                className={`h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 ${isTransparent || isOpen ? 'drop-shadow-lg' : ''}`}
              />
            </Link>
          </div>

          {/* Right: Lang Toggle & Contact */}
          <div className="flex items-center justify-end flex-1 space-x-4 md:space-x-8">
            <div className={`flex items-center text-[10px] font-bold uppercase tracking-widest ${textColor} transition-colors duration-300`}>
              <button
                onClick={() => setLanguage('pt')}
                className={`px-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 rounded ${language === 'pt' ? 'text-[#da6927]' : 'hover:text-[#da6927]/60'}`}
              >
                PT
              </button>
              <span className="opacity-20 px-0.5">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 rounded ${language === 'en' ? 'text-[#da6927]' : 'hover:text-[#da6927]/60'}`}
              >
                EN
              </button>
            </div>

            <Link
              to="/contacts"
              className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 md:px-8 py-2.5 md:py-3 rounded-full transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 ${isTransparent
                ? 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-[#0d4357]'
                : 'bg-[#0d4357] border-[#0d4357] text-white hover:bg-[#da6927] hover:border-[#da6927]'
                }`}
            >
              {t('nav.contactBtn')}
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <div className={`fixed inset-0 bg-[#0d4357] z-[-1] transition-all duration-700 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-center items-center text-center p-8">
          <ul className="space-y-4 md:space-y-6">
            {[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.tours'), path: '/tours' },
              { label: t('nav.experience'), path: '/algarve' },
              { label: t('nav.logistics'), path: '/transfers' },
              { label: t('nav.story'), path: '/about' },
              { label: t('nav.contact'), path: '/contacts' },
            ].map((item, i) => (
              <li key={i} className={`transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl md:text-6xl font-bold font-montserrat text-white hover:text-[#da6927] transition-colors tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
