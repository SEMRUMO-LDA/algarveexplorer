'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import AnimatedBlob from '@/components/AnimatedBlob';

const FooterCTA: React.FC = () => {
    const pathname = usePathname();

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-[#0d4357] text-white relative overflow-hidden">
            {/* Background Animated Blobs */}
            <AnimatedBlob 
                className="-top-24 -left-24" 
                opacity={0.3} 
                size="w-[600px] h-[600px]"
                blendMode="screen"
            />
            <AnimatedBlob 
                className="-bottom-24 -right-24" 
                opacity={0.2} 
                size="w-[500px] h-[500px]"
                duration="40s"
                blendMode="color-dodge"
            />
            
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

            <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.4em] mb-8 block drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Comece a sua Viagem</span>
                <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-10 tracking-tight uppercase leading-tight">Pronto para explorar o Algarve de forma diferente?</h2>
                <p className="text-white text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    Planear pode ser complicado. Explorar não tem de ser.<br />
                    Deixe-nos guiá-lo até à experiência certa.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                    <Link
                        href="/tours"
                        className="inline-flex items-center justify-center gap-4 bg-[#da6927] text-white px-8 py-4 sm:px-12 sm:py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0d4357] transition-colors duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                    >
                        <span>Ver experiências</span>
                        <ArrowRight size={16} />
                    </Link>
                    {pathname !== '/contacts' && (
                        <Link
                            href="/contacts"
                            className="inline-flex items-center justify-center bg-white/0 border border-white/40 text-white px-8 py-4 sm:px-12 sm:py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0d4357] transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                        >
                            Falar connosco
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
