import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Users, Leaf, ArrowRight, Footprints, ShieldCheck, Plus } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="bg-[#0d4357] pt-48 pb-24 md:pt-64 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover"
            alt="Algarve Terrain"
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">Our Philosophy</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">Algarve Explorer</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            SINCE 2016
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Born from a passion for the quiet corners of Southern Portugal. We specialize in trails that tell the region's oldest stories.
          </p>
        </div>
      </section>

      {/* Brand Narrative & Image Composition */}
      <section className="py-24 md:py-48 bg-[#fdfdfb]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

            {/* Left Column: Brand Story */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="max-w-xl">
                <div className="flex items-center space-x-3 mb-10 text-[#0d4357]/40">
                  <Compass size={24} className="text-[#da6927]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">The Core Narrative</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-montserrat text-[#0d4357] mb-12 tracking-tight leading-[1.1] uppercase">
                  Authenticity <br />comes to life.
                </h2>
                <div className="space-y-8 text-[#0d4357]/60 text-lg md:text-xl font-light leading-relaxed">
                  <p>
                    Our mission has always been to provide the best possible experience to those who seek the true heart of Portugal. We believe the secrets of the region shouldn't be kept hidden—they should be shared with respect and care.
                  </p>
                  <p>
                    Algarve Explorer was created to showcase hidden gems away from the haste and noise of conventional tourism. We travel at the pace of nature, uncovering the soul of the landscape one step at a time.
                  </p>
                  <p>
                    Each trail we curate is a result of hundreds of hours of exploration. We don't just guide you through paths; we connect you with the shepherds, the artisans, and the silence of the Monchique peaks.
                  </p>
                </div>
                <div className="mt-16">
                  <Link to="/tours" className="inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#da6927] transition-all shadow-lg group">
                    <span>Discover the Trails</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Image Composition (Collage) */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative h-[400px] md:h-[500px] w-full max-w-2xl mx-auto">
                <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl z-20">
                  <img
                    src="https://images.unsplash.com/photo-1551632432-c7360b7f0187?auto=format&fit=crop&q=80&w=1000"
                    className="w-full h-full object-cover"
                    alt="Main view"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[60%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-30 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Coastal cliff detail"
                  />
                </div>
                <div className="absolute top-10 left-10 w-[40%] h-[30%] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10 opacity-80 md:opacity-100">
                  <img
                    src="https://images.unsplash.com/photo-1520110120385-ad28c7790c7f?auto=format&fit=crop&q=80&w=600"
                    className="w-full h-full object-cover"
                    alt="Village life"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#da6927]/10 rounded-full blur-3xl z-0"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 md:py-48 bg-white border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">Our Commitment</span>
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-[#0d4357] mb-12 tracking-tight uppercase">Community & Sustainability</h2>
              <div className="space-y-8 text-[#0d4357]/50 text-lg font-light leading-relaxed">
                <p>
                  By supporting the local economy and the communities that surround us, we work in close partnership with local producers, regional guides, and family-owned businesses.
                </p>
                <p>
                  We promote sustainable development and contribute to the well-being of the Algarve, strengthening the social fabric that unites the coast and the mountains.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Local Partners", icon: <Users className="text-[#da6927]" size={28} />, desc: "Guided by regional experts." },
                { title: "Eco-Focus", icon: <Leaf className="text-[#da6927]" size={28} />, desc: "Preserving the trails for tomorrow." },
                { title: "Slow Travel", icon: <Footprints className="text-[#da6927]" size={28} />, desc: "Escape the noise and haste." },
                { title: "Total Care", icon: <ShieldCheck className="text-[#da6927]" size={28} />, desc: "Safety and regional knowledge." }
              ].map((val, i) => (
                <div key={i} className="bg-[#fcfcf9] p-10 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                  <div className="mb-6">{val.icon}</div>
                  <h3 className="text-lg font-bold font-montserrat text-[#0d4357] mb-4 uppercase tracking-tight group-hover:text-[#da6927] transition-colors">{val.title}</h3>
                  <p className="text-[#0d4357]/40 text-sm leading-relaxed font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section - Moved and Styled with High-Impact Design */}
      <section className="py-32 md:py-56 bg-[#0d4357] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 grayscale pointer-events-none">
          <img src="https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=1920" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <span className="text-[#da6927] text-[11px] font-bold uppercase tracking-[0.4em] mb-10 block">Ready to explore?</span>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-12 tracking-tight leading-tight uppercase">
              The secret trail <br />awaits.
            </h2>

            <p className="text-white/50 text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
              Whether you're looking for a quiet morning walk or a multi-day expedition, we have the regional expertise to make it unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/tours"
                className="inline-flex items-center space-x-4 bg-[#da6927] text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-[#0d4357] transition-all shadow-2xl group"
              >
                <span>View Our Adventures</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/contacts"
                className="inline-flex items-center space-x-4 bg-transparent border border-white/20 text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all shadow-2xl"
              >
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;