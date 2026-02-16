import React from 'react';
import { Link } from 'react-router-dom';
import { TOURS } from '../constants';
import { ChevronRight, ArrowRight, Compass, Plus } from 'lucide-react';

const Tours: React.FC = () => {
  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="bg-[#0d4357] pt-48 pb-24 md:pt-64 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover"
            alt="Scenic mountain range background for tour collection"
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">Guided Tours</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">Our Collection</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            THE ADVENTURES
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            From challenging mountain peaks to serene coastal paths, our tours are designed for those who appreciate nature and adventure in their purest forms.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">
          {TOURS.map((tour) => (
            <div key={tour.id} className="group flex flex-col">
              <Link to={`/tours/${tour.slug}`} className="block flex-1 flex flex-col">
                <div className="aspect-video overflow-hidden rounded-3xl bg-slate-100 mb-10 relative">
                  <img
                    src={tour.image}
                    alt={`Scenic preview of the ${tour.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-8 left-8 bg-white/95 px-5 py-2 rounded-full shadow-sm">
                    <span className="text-[11px] font-bold text-[#0d4357] uppercase tracking-widest">{tour.duration}</span>
                  </div>
                </div>

                <div className="flex justify-between items-start px-2">
                  <div className="max-w-[80%]">
                    <div className="flex items-center space-x-3 text-[#da6927] mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">{tour.difficulty}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-montserrat text-[#0d4357] mb-6 tracking-tight group-hover:text-[#da6927] transition-colors uppercase">
                      {tour.title}
                    </h3>
                    <p className="text-[#0d4357]/50 text-lg font-light leading-relaxed">
                      {tour.description}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#0d4357] group-hover:text-white transition-all">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <section className="bg-white py-32 border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Guided Adventures', value: '150+' },
            { label: 'Trails Scouted', value: '2,400km' },
            { label: 'Happy Explorers', value: '5,000+' },
            { label: 'Est. Regionally', value: '2016' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0d4357] font-montserrat tracking-tight">{stat.value}</p>
              <p className="text-[#0d4357]/30 text-[10px] font-bold uppercase tracking-[0.4em] mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;