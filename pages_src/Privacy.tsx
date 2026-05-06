'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

interface PrivacySection {
  title: string;
  content: string[];
}

interface PrivacyContact {
  title: string;
  intro: string;
  company: string;
  address: string;
  email: string;
  phone: string;
}

const Privacy: React.FC = () => {
  const t = useTranslations('privacy');
  // Sections + contact are structured data; pull them as raw JSON so the
  // shape stays the same in both messages files and the renderer below
  // doesn't need to know about each numbered section individually.
  const sections = t.raw('sections') as PrivacySection[];
  const contact = t.raw('contact') as PrivacyContact;

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      <section className="relative bg-gradient-to-br from-[#0d4357] to-[#1a5670] text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Shield size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-center mb-6 uppercase tracking-tight">
            {t('title')}
          </h1>
          <p className="text-white/80 text-center text-sm md:text-base max-w-2xl mx-auto">
            {t('lastUpdated')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-brand-body/80 text-lg leading-relaxed">
              {t('intro')}
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="border-l-4 border-[#da6927] pl-6 py-2">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 font-montserrat">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-brand-body/80 leading-relaxed">
                      {paragraph.split('**').map((part, i) =>
                        i % 2 === 0 ? part : <strong key={i} className="font-bold text-brand-navy">{part}</strong>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#0d4357] to-[#1a5670] rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-montserrat">
              {contact.title}
            </h2>
            <p className="mb-8 text-white/90">
              {contact.intro}
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold">{contact.company}</p>
                  <p className="text-white/80">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#da6927] transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-[#da6927] transition-colors">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
