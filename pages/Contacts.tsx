import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Contacts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fdfdfb]">
      {/* Unified Hero Section */}
      <section className="bg-[#0d4357] pt-48 pb-24 md:pt-64 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover"
            alt="Beautiful panoramic view of the Algarve coastline"
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('contacts.hero.eyebrow')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">{t('contacts.hero.eyebrow')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat text-white mb-8 uppercase tracking-tighter leading-none">
            {t('contacts.hero.title')}
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {t('contacts.hero.desc')}
          </p>
        </div>
      </section>

      {/* Contact Content Area */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-16">
              <div>
                <div className="flex items-center space-x-3 mb-10 text-[#0d4357]/40">
                  <span className="text-xl font-light leading-none">+</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{t('contacts.info.eyebrow')}</span>
                </div>

                <div className="space-y-12">
                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-white border border-[#0d4357]/10 flex items-center justify-center text-[#da6927] group-hover:bg-[#da6927] group-hover:text-white transition-all shadow-sm">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-[#0d4357] mb-2">WhatsApp / Call</h4>
                      <p className="text-2xl font-bold font-montserrat text-[#0d4357] tracking-tight">+351 968 306 031</p>
                      <span className="text-[9px] text-[#0d4357]/40 italic">(chamada para rede móvel nacional)</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-white border border-[#0d4357]/10 flex items-center justify-center text-[#da6927] group-hover:bg-[#da6927] group-hover:text-white transition-all shadow-sm">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-[#0d4357] mb-2">Email</h4>
                      <p className="text-2xl font-bold font-montserrat text-[#0d4357] tracking-tight text-wrap break-all lowercase">algarveexplorer@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-white border border-[#0d4357]/10 flex items-center justify-center text-[#da6927] group-hover:bg-[#da6927] group-hover:text-white transition-all shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-[#0d4357] mb-2">{t('contacts.info.location')}</h4>
                      <p className="text-xl font-bold font-montserrat text-[#0d4357] tracking-tight uppercase">FARO, PORTUGAL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-16 border border-[#0d4357]/5 shadow-sm">
                <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{t('contacts.form.name')}</label>
                      <input
                        type="text"
                        placeholder={t('contacts.form.namePlaceholder')}
                        className="w-full bg-[#f0f0eb] border-none px-4 py-4 border-b border-[#0d4357]/10 focus:ring-2 focus:ring-[#da6927] focus:border-[#da6927] transition-all outline-none font-semibold text-[#0d4357] placeholder:text-[#0d4357]/20 uppercase"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{t('contacts.form.email')}</label>
                      <input
                        type="email"
                        placeholder="ALEX@EMAIL.COM"
                        className="w-full bg-[#f0f0eb] border-none px-4 py-4 border-b border-[#0d4357]/10 focus:ring-2 focus:ring-[#da6927] focus:border-[#da6927] transition-all outline-none font-semibold text-[#0d4357] placeholder:text-[#0d4357]/20 uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{t('contacts.form.subject')}</label>
                    <select className="w-full bg-[#f0f0eb] border-none px-4 py-4 border-b border-[#0d4357]/10 focus:ring-2 focus:ring-[#da6927] focus:border-[#da6927] transition-all outline-none font-semibold text-[#0d4357] appearance-none uppercase">
                      <option>{t('contacts.form.subjects.tour')}</option>
                      <option>{t('contacts.form.subjects.transfer')}</option>
                      <option>{t('contacts.form.subjects.other')}</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0d4357]/40">{t('contacts.form.message')}</label>
                    <textarea
                      rows={6}
                      placeholder={t('contacts.form.messagePlaceholder')}
                      className="w-full bg-[#f0f0eb] border-none px-4 py-4 border-b border-[#0d4357]/10 focus:ring-2 focus:ring-[#da6927] focus:border-[#da6927] transition-all outline-none font-semibold text-[#0d4357] placeholder:text-[#0d4357]/20 uppercase"
                    ></textarea>
                  </div>

                  <button className="bg-[#0d4357] hover:bg-[#da6927] text-white px-12 py-6 font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center transition-all duration-300 shadow-2xl rounded-full focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2">
                    {t('contacts.form.submit')} <Send className="ml-3" size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map spread */}
      <section className="h-[500px] w-full bg-[#0d4357] relative overflow-hidden grayscale brightness-50 contrast-125">
        <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" alt="Stylized terrain map of the Algarve region" />
        <div className="absolute inset-0 bg-[#0d4357]/40"></div>
        <div className="absolute inset-0 flex items-center justify-center grayscale-0 brightness-100">
          <div className="bg-white p-8 shadow-2xl flex items-center space-x-6 border border-[#0d4357]/10">
            <div className="bg-[#da6927] p-3 text-white shadow-lg rounded-full"><MapPin size={32} /></div>
            <div>
              <p className="font-bold text-2xl font-montserrat text-[#0d4357] uppercase tracking-tighter">{t('contacts.info.base')}</p>
              <p className="text-[#0d4357]/40 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">FARO, PORTUGAL</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;