'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Privacy: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: March 26, 2026',
      intro: 'At Algarve Explorer, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      sections: [
        {
          title: '1. Information We Collect',
          content: [
            '**Personal Information:** When you book a tour or contact us, we may collect personal information including your name, email address, phone number, and payment details.',
            '**Booking Information:** Details about your tour reservations, preferences, and any special requirements.',
            '**Technical Data:** We automatically collect certain information about your device, including IP address, browser type, and usage data through cookies and similar technologies.',
            '**Communications:** Records of your correspondence with us, including emails and messages.'
          ]
        },
        {
          title: '2. How We Use Your Information',
          content: [
            '**Tour Services:** To process bookings, manage reservations, and provide you with tour experiences.',
            '**Communication:** To send booking confirmations, updates, and respond to your inquiries.',
            '**Improvement:** To analyze usage patterns and improve our website and services.',
            '**Marketing:** With your consent, to send promotional materials about our tours and special offers.',
            '**Legal Compliance:** To comply with legal obligations and protect our rights.'
          ]
        },
        {
          title: '3. Legal Basis for Processing (GDPR)',
          content: [
            '**Contract Performance:** Processing necessary to fulfill our contract with you for tour services.',
            '**Legitimate Interests:** For business operations, fraud prevention, and service improvement.',
            '**Consent:** For marketing communications and non-essential cookies.',
            '**Legal Obligation:** To comply with applicable laws and regulations.'
          ]
        },
        {
          title: '4. Data Sharing and Disclosure',
          content: [
            '**Service Providers:** We share data with trusted partners who help us operate our business (payment processors, booking systems, email services).',
            '**Legal Requirements:** We may disclose information when required by law or to protect our rights.',
            '**Business Transfers:** In the event of a merger or acquisition, your information may be transferred.',
            'We do not sell your personal information to third parties.'
          ]
        },
        {
          title: '5. Cookies and Tracking Technologies',
          content: [
            '**Essential Cookies:** Necessary for website functionality.',
            '**Analytics Cookies:** To understand how visitors use our site.',
            '**Marketing Cookies:** For targeted advertising (with your consent).',
            'You can control cookies through your browser settings. Disabling cookies may affect site functionality.'
          ]
        },
        {
          title: '6. Data Security',
          content: [
            'We implement appropriate technical and organizational measures to protect your personal information:',
            '• SSL encryption for data transmission',
            '• Secure payment processing',
            '• Regular security assessments',
            '• Limited access to personal data',
            'However, no method of transmission over the internet is 100% secure.'
          ]
        },
        {
          title: '7. Data Retention',
          content: [
            'We retain your personal information only as long as necessary:',
            '• Booking data: 7 years (for tax and legal purposes)',
            '• Marketing data: Until you withdraw consent',
            '• Technical data: Up to 2 years',
            'After the retention period, we securely delete or anonymize your data.'
          ]
        },
        {
          title: '8. Your Rights (GDPR)',
          content: [
            '**Right to Access:** Request a copy of your personal data.',
            '**Right to Rectification:** Correct inaccurate or incomplete data.',
            '**Right to Erasure:** Request deletion of your data ("right to be forgotten").',
            '**Right to Restriction:** Limit how we process your data.',
            '**Right to Data Portability:** Receive your data in a structured format.',
            '**Right to Object:** Object to processing based on legitimate interests.',
            '**Right to Withdraw Consent:** Withdraw consent for marketing or cookies at any time.',
            'To exercise these rights, contact us using the details below.'
          ]
        },
        {
          title: '9. International Data Transfers',
          content: [
            'Your data is primarily processed within the European Union. If we transfer data outside the EU, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.'
          ]
        },
        {
          title: '10. Children\'s Privacy',
          content: [
            'Our services are not directed to children under 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.'
          ]
        },
        {
          title: '11. Third-Party Links',
          content: [
            'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites. Please review their privacy policies before providing any information.'
          ]
        },
        {
          title: '12. Updates to This Policy',
          content: [
            'We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy regularly.'
          ]
        }
      ],
      contact: {
        title: '13. Contact Us',
        intro: 'If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:',
        company: 'Algarve Explorer Tours',
        address: 'Albufeira, Algarve, Portugal',
        email: 'info@algarveexplorer.com',
        phone: '+351 XXX XXX XXX'
      }
    },
    pt: {
      title: 'Política de Privacidade',
      lastUpdated: 'Última atualização: 26 de março de 2026',
      intro: 'Na Algarve Explorer, estamos comprometidos em proteger a sua privacidade e garantir a segurança das suas informações pessoais. Esta Política de Privacidade explica como recolhemos, usamos, divulgamos e protegemos as suas informações quando visita o nosso website ou utiliza os nossos serviços.',
      sections: [
        {
          title: '1. Informações que Recolhemos',
          content: [
            '**Informações Pessoais:** Quando reserva um tour ou nos contacta, podemos recolher informações pessoais incluindo o seu nome, endereço de email, número de telefone e detalhes de pagamento.',
            '**Informações de Reserva:** Detalhes sobre as suas reservas de tours, preferências e quaisquer requisitos especiais.',
            '**Dados Técnicos:** Recolhemos automaticamente certas informações sobre o seu dispositivo, incluindo endereço IP, tipo de navegador e dados de utilização através de cookies e tecnologias similares.',
            '**Comunicações:** Registos da sua correspondência connosco, incluindo emails e mensagens.'
          ]
        },
        {
          title: '2. Como Utilizamos as Suas Informações',
          content: [
            '**Serviços de Tours:** Para processar reservas, gerir marcações e fornecer-lhe experiências de tours.',
            '**Comunicação:** Para enviar confirmações de reserva, atualizações e responder às suas questões.',
            '**Melhoria:** Para analisar padrões de utilização e melhorar o nosso website e serviços.',
            '**Marketing:** Com o seu consentimento, para enviar materiais promocionais sobre os nossos tours e ofertas especiais.',
            '**Conformidade Legal:** Para cumprir obrigações legais e proteger os nossos direitos.'
          ]
        },
        {
          title: '3. Base Legal para Processamento (RGPD)',
          content: [
            '**Execução de Contrato:** Processamento necessário para cumprir o nosso contrato consigo para serviços de tours.',
            '**Interesses Legítimos:** Para operações comerciais, prevenção de fraudes e melhoria de serviços.',
            '**Consentimento:** Para comunicações de marketing e cookies não essenciais.',
            '**Obrigação Legal:** Para cumprir leis e regulamentos aplicáveis.'
          ]
        },
        {
          title: '4. Partilha e Divulgação de Dados',
          content: [
            '**Fornecedores de Serviços:** Partilhamos dados com parceiros de confiança que nos ajudam a operar o nosso negócio (processadores de pagamento, sistemas de reserva, serviços de email).',
            '**Requisitos Legais:** Podemos divulgar informações quando exigido por lei ou para proteger os nossos direitos.',
            '**Transferências Comerciais:** No caso de fusão ou aquisição, as suas informações podem ser transferidas.',
            'Não vendemos as suas informações pessoais a terceiros.'
          ]
        },
        {
          title: '5. Cookies e Tecnologias de Rastreamento',
          content: [
            '**Cookies Essenciais:** Necessários para o funcionamento do website.',
            '**Cookies Analíticos:** Para compreender como os visitantes usam o nosso site.',
            '**Cookies de Marketing:** Para publicidade direcionada (com o seu consentimento).',
            'Pode controlar os cookies através das definições do seu navegador. Desativar cookies pode afetar a funcionalidade do site.'
          ]
        },
        {
          title: '6. Segurança de Dados',
          content: [
            'Implementamos medidas técnicas e organizacionais apropriadas para proteger as suas informações pessoais:',
            '• Encriptação SSL para transmissão de dados',
            '• Processamento seguro de pagamentos',
            '• Avaliações regulares de segurança',
            '• Acesso limitado a dados pessoais',
            'No entanto, nenhum método de transmissão pela internet é 100% seguro.'
          ]
        },
        {
          title: '7. Retenção de Dados',
          content: [
            'Retemos as suas informações pessoais apenas pelo tempo necessário:',
            '• Dados de reserva: 7 anos (para fins fiscais e legais)',
            '• Dados de marketing: Até retirar o consentimento',
            '• Dados técnicos: Até 2 anos',
            'Após o período de retenção, eliminamos ou anonimizamos os seus dados de forma segura.'
          ]
        },
        {
          title: '8. Os Seus Direitos (RGPD)',
          content: [
            '**Direito de Acesso:** Solicitar uma cópia dos seus dados pessoais.',
            '**Direito de Retificação:** Corrigir dados imprecisos ou incompletos.',
            '**Direito ao Apagamento:** Solicitar a eliminação dos seus dados ("direito ao esquecimento").',
            '**Direito à Limitação:** Limitar como processamos os seus dados.',
            '**Direito à Portabilidade:** Receber os seus dados num formato estruturado.',
            '**Direito de Oposição:** Opor-se ao processamento baseado em interesses legítimos.',
            '**Direito de Retirar Consentimento:** Retirar o consentimento para marketing ou cookies a qualquer momento.',
            'Para exercer estes direitos, contacte-nos usando os detalhes abaixo.'
          ]
        },
        {
          title: '9. Transferências Internacionais de Dados',
          content: [
            'Os seus dados são principalmente processados dentro da União Europeia. Se transferirmos dados para fora da UE, asseguramos que existem salvaguardas apropriadas, como Cláusulas Contratuais Padrão ou decisões de adequação.'
          ]
        },
        {
          title: '10. Privacidade de Crianças',
          content: [
            'Os nossos serviços não são direcionados a crianças menores de 16 anos. Não recolhemos intencionalmente informações pessoais de crianças. Se acredita que recolhemos inadvertidamente tais informações, contacte-nos imediatamente.'
          ]
        },
        {
          title: '11. Links de Terceiros',
          content: [
            'O nosso website pode conter links para websites de terceiros. Não somos responsáveis pelas práticas de privacidade destes sites. Por favor, reveja as suas políticas de privacidade antes de fornecer qualquer informação.'
          ]
        },
        {
          title: '12. Atualizações a Esta Política',
          content: [
            'Podemos atualizar esta Política de Privacidade periodicamente. As alterações serão publicadas nesta página com uma data de "Última Atualização" atualizada. Encorajamos a rever esta política regularmente.'
          ]
        }
      ],
      contact: {
        title: '13. Contacte-nos',
        intro: 'Se tiver questões sobre esta Política de Privacidade ou desejar exercer os seus direitos, contacte-nos:',
        company: 'Algarve Explorer Tours',
        address: 'Albufeira, Algarve, Portugal',
        email: 'info@algarveexplorer.com',
        phone: '+351 XXX XXX XXX'
      }
    }
  };

  const currentContent = language === 'pt' ? content.pt : content.en;

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      {/* Hero Section */}
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
            {currentContent.title}
          </h1>
          <p className="text-white/80 text-center text-sm md:text-base max-w-2xl mx-auto">
            {currentContent.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-12">
          {/* Introduction */}
          <div className="mb-16">
            <p className="text-brand-body/80 text-lg leading-relaxed">
              {currentContent.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {currentContent.sections.map((section, index) => (
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

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-br from-[#0d4357] to-[#1a5670] rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-montserrat">
              {currentContent.contact.title}
            </h2>
            <p className="mb-8 text-white/90">
              {currentContent.contact.intro}
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold">{currentContent.contact.company}</p>
                  <p className="text-white/80">{currentContent.contact.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <a href={`mailto:${currentContent.contact.email}`} className="hover:text-[#da6927] transition-colors">
                  {currentContent.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <a href={`tel:${currentContent.contact.phone.replace(/\s/g, '')}`} className="hover:text-[#da6927] transition-colors">
                  {currentContent.contact.phone}
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
