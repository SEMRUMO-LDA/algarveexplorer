import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';
import AnimatedBlob from '../components/AnimatedBlob';

const Contacts: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      {/* Editorial Dark Header */}
      <section className="relative pt-32 pb-20 md:pt-64 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/image/contacts-toppage.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          {/* Scrim Overlay - Editorial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('nav.contact')}</span>
          </div>
          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">{t('contacts.hero.eyebrow')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-montserrat text-white mb-8 uppercase tracking-tighter leading-none">
            {t('contacts.hero.title')}
          </h1>
          <p className="font-sans text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-12">
            {t('contacts.hero.desc')}
          </p>
        </div>
      </section>

      {/* Contact Content Area */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <AnimatedBlob 
          className="top-1/2 -right-32" 
          opacity={0.1} 
          size="w-[700px] h-[700px]"
          duration="45s"
          blendMode="multiply"
        />
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Info Panel */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-12 text-brand-body/80">
                <Plus size={16} className="text-[#da6927]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-body/90">{t('contacts.info.eyebrow')}</span>
              </div>

              <div className="space-y-10">
                {/* Phone */}
                <div className="border-l-2 border-[#da6927] pl-8 group">
                  <div className="flex items-center space-x-3 mb-2">
                    <Phone size={14} className="text-[#da6927]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">WhatsApp / Call</span>
                  </div>
                  <p className="text-2xl font-bold font-montserrat text-[#0d4357] tracking-tight">+351 968 306 031</p>
                  <span className="text-[9px] text-brand-body/30 italic">{language === 'pt' ? '(chamada para rede móvel nacional)' : '(call to national mobile network)'}</span>
                </div>

                {/* Email */}
                <div className="border-l-2 border-[#da6927] pl-8 group">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail size={14} className="text-[#da6927]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">Email</span>
                  </div>
                  <p className="text-lg font-bold font-montserrat text-[#0d4357] tracking-tight break-all lowercase">algarveexplorer@gmail.com</p>
                </div>

                {/* Location */}
                <div className="border-l-2 border-[#da6927] pl-8 group">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin size={14} className="text-[#da6927]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.info.location')}</span>
                  </div>
                  <p className="text-xl font-bold font-montserrat text-brand-navy tracking-tight uppercase">Faro, Portugal</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.name')}</label>
                    <input
                      type="text"
                      placeholder={t('contacts.form.namePlaceholder')}
                      className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body placeholder:text-brand-body/80 placeholder:font-light uppercase transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.email')}</label>
                    <input
                      type="email"
                      placeholder="ALEX@EMAIL.COM"
                      className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body placeholder:text-brand-body/80 placeholder:font-light uppercase transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.subject')}</label>
                  <select className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body appearance-none uppercase transition-colors cursor-pointer">
                    <option>{t('contacts.form.subjects.tour')}</option>
                    <option>{t('contacts.form.subjects.transfer')}</option>
                    <option>{t('contacts.form.subjects.other')}</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.message')}</label>
                  <textarea
                    rows={6}
                    placeholder={t('contacts.form.messagePlaceholder')}
                    className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body placeholder:text-brand-body/80 placeholder:font-light uppercase transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center space-x-4 bg-[#0d4357] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#da6927] transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
                >
                  <span>{t('contacts.form.submit')}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default Contacts;