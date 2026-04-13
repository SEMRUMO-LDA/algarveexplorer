'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import FooterCTA from '@/components/FooterCTA';
import AnimatedBlob from '@/components/AnimatedBlob';
import { forms } from '@/services/kiban';

const Contacts: React.FC = () => {
  const { t, language } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'TOUR BOOKING',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      await forms.submit({
        form_name: 'contact',
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
      });
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: 'TOUR BOOKING', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fffbf9] min-h-screen overflow-x-hidden">
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
          <div className="flex items-center space-x-2 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('nav.contact')}</span>
          </div>
          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">{t('contacts.hero.eyebrow')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-8 uppercase tracking-tighter leading-none">
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
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <CheckCircle size={48} className="text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold font-montserrat text-brand-navy mb-4 uppercase">
                    {language === 'pt' ? 'Mensagem Enviada!' : 'Message Sent!'}
                  </h3>
                  <p className="text-brand-body/60 text-lg font-light">
                    {language === 'pt' ? 'Entraremos em contacto em breve.' : "We'll get back to you shortly."}
                  </p>
                </div>
              ) : (
                <form className="space-y-10" onSubmit={handleSubmit}>
                  {error && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                      <AlertCircle size={20} />
                      <span className="text-sm font-medium">
                        {language === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.'}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.name')}</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                        placeholder={t('contacts.form.namePlaceholder')}
                        className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body placeholder:text-brand-body/80 placeholder:font-light uppercase transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.email')}</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                        placeholder="ALEX@EMAIL.COM"
                        className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body placeholder:text-brand-body/80 placeholder:font-light uppercase transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.subject')}</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState(s => ({ ...s, subject: e.target.value }))}
                      className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body appearance-none uppercase transition-colors cursor-pointer"
                    >
                      <option>{t('contacts.form.subjects.tour')}</option>
                      <option>{t('contacts.form.subjects.transfer')}</option>
                      <option>{t('contacts.form.subjects.other')}</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/80">{t('contacts.form.message')}</label>
                    <textarea
                      rows={6}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      placeholder={t('contacts.form.messagePlaceholder')}
                      className="w-full bg-transparent border-b-2 border-brand-body/10 focus:border-[#da6927] pb-4 outline-none font-sans font-medium text-brand-body placeholder:text-brand-body/80 placeholder:font-light uppercase transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center space-x-3 bg-[#0d4357] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#da6927] transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{submitting ? (language === 'pt' ? 'A ENVIAR...' : 'SENDING...') : t('contacts.form.submit')}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

export default Contacts;