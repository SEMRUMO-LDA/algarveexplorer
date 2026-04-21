'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useSensoryTheme } from '@/lib/SensoryContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();
  const { vibrate } = useSensoryTheme();
  const pathname = usePathname();

  const isHeroPage = pathname === '/' ||
    pathname.startsWith('/tours/') ||
    ['/tours', '/transfers', '/about', '/contacts', '/algarve'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHeroPage && !scrolled && !isOpen;

  const textColor = (isTransparent || isOpen) ? 'text-white' : 'text-[#0d4357]';
  const navBg = isTransparent ? 'bg-transparent' : 'bg-white shadow-sm';
  const padding = scrolled ? 'py-4 md:py-5' : 'py-5 md:py-8';

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${navBg} ${padding}`}>
      <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center relative">

          {/* Left: Menu Trigger */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => {
                vibrate(10);
                setIsOpen(!isOpen);
              }}
              className={`flex items-center space-x-3 group focus:outline-none rounded-lg p-2 -ml-2 transition-colors duration-300 ${isOpen ? 'text-white' : textColor}`}
              aria-label="Menu"
            >
              <div className="flex flex-col space-y-1.5 w-6 h-6 justify-center">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-full rotate-45 translate-y-2' : 'w-full'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 w-full' : 'w-4'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-full -rotate-45 -translate-y-2' : 'w-5'}`}></span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] hidden sm:block">Menu</span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Link href="/" className="flex items-center group focus:outline-none rounded">
              <img
                src={isTransparent || isOpen ? "/image/algarvexplorer-logo-branco.png" : "/image/algarvexplorer-logo-azul.png"}
                alt="Algarve Explorer Logo"
                className={`h-12 sm:h-14 md:h-16 w-auto transition-all duration-300 ${isTransparent || isOpen ? 'drop-shadow-lg' : ''}`}
              />
            </Link>
          </div>

          {/* Right: Language switcher + Contact */}
          <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-3 md:space-x-4">
            <LanguageSwitcher isTransparent={isTransparent} />

            <button
              onClick={() => {
                const languageParam = language === 'pt' ? 'pt-pt' : 'en';
                window.open(
                  `https://fareharbor.com/embeds/book/algarveexplorertours/?full-items=yes&language=${languageParam}`,
                  'FareHarborBooking',
                  'width=800,height=800,scrollbars=yes'
                );
              }}
              className={`hidden sm:inline-flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 sm:px-8 sm:py-3 rounded-full transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 ${isTransparent
                ? 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-[#0d4357]'
                : 'bg-[#0d4357] border-[#0d4357] text-white hover:bg-[#da6927] hover:border-[#da6927]'
                }`}
            >
              Reservar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <div className={`fixed inset-0 bg-[#0d4357] z-[-1] transition-all duration-700 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-center items-center text-center p-8">
          <ul className="space-y-4 md:space-y-6">
            {[
              { label: 'Início', path: '/' },
              { label: 'Tours', path: '/tours' },
              { label: 'Transfers', path: '/transfers' },
              { label: 'O Algarve', path: '/algarve' },
              { label: 'Sobre Nós', path: '/about' },
              { label: 'Contactos', path: '/contacts' },
            ].map((item, i) => (
              <li key={i} className={`transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <Link
                  href={item.path}
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
