import React from 'react';
import { Link } from 'react-router-dom';
import { TRANSFERS } from '../constants';
import { Truck, Users, Luggage, ShieldCheck, Plus, ChevronRight } from 'lucide-react';

const Transfers: React.FC = () => {
  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      {/* Unified Hero Section - Now starts at top with extra padding for navbar */}
      <section className="bg-[#0d4357] pt-40 pb-24 md:pt-56 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover" 
            alt="bg" 
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">Logistics & Transfers</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">Seamless Logistics</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none">
            TRAIL LOGISTICS
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Hassle-free transport for you and your gear. Our professional fleet is ready to take you from the airport to any trailhead in the Algarve.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {TRANSFERS.map((service) => (
              <div key={service.id} className="group flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4 text-[#da6927]">
                      <Truck size={20} />
                      <span className="text-[11px] font-bold uppercase tracking-[0.4em]">REGULAR ROUTE</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-montserrat text-[#0d4357] tracking-tight group-hover:text-[#da6927] transition-colors whitespace-pre-line">
                      {service.route.replace(' to ', '\nTo ')}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold font-montserrat text-[#0d4357] tracking-tighter">€{service.price}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#0d4357]/40 mt-1">Starting from</span>
                  </div>
                </div>

                <p className="text-[#0d4357]/60 text-lg font-light leading-relaxed mb-12 max-w-md">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-8 mb-16">
                  <div className="flex items-center space-x-3">
                    <Users size={18} className="text-[#da6927]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0d4357]">{service.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Luggage size={18} className="text-[#da6927]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0d4357]">Equipment Storage</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link to="/contacts" className="inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#da6927] transition-all shadow-xl group/btn">
                    <span>BOOK TRANSFER</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Quote Section */}
          <div className="mt-32 bg-[#0d4357] p-12 md:p-24 rounded-3xl relative overflow-hidden text-white">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-10 text-white/30">
                  <span className="text-xl font-light leading-none">+</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Bespoke Logistics</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-montserrat mb-12 tracking-tight leading-tight">
                  NEED A CUSTOM <br />SHUTTLE?
                </h2>
                <p className="text-white/50 text-xl font-light leading-relaxed mb-12">
                  From solo explorers to large groups, we handle the logistics. Trailhead drop-offs, event support, or cross-regional luggage transport.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={20} className="text-[#da6927]" />
                    <span className="text-xs font-bold uppercase tracking-widest">INSURED & LICENSED</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Link to="/contacts" className="bg-[#da6927] text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0d4357] transition-all shadow-2xl">
                  REQUEST A QUOTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transfers;