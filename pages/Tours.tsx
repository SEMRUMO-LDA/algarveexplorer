import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOURS } from '../constants';
import { ChevronRight, ArrowRight, Compass, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import FooterCTA from '../components/FooterCTA';
import AnimatedBlob from '../components/AnimatedBlob';
import ParallaxImage from '../components/ParallaxImage';
import { useSharedImage } from '../components/SharedImageTransition';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const Tours: React.FC = () => {
  const { t, language } = useLanguage();
  const { startTransition } = useSharedImage();
  const navigate = useNavigate();

  const handleTourClick = (e: React.MouseEvent<HTMLAnchorElement>, tour: typeof TOURS[0]) => {
    e.preventDefault();
    const imageElement = e.currentTarget.querySelector('img') as HTMLElement;
    if (imageElement) {
      startTransition(tour.image, imageElement);
      // Navigate after a brief delay to let the animation start
      setTimeout(() => {
        navigate(`/tours/${tour.slug}`);
      }, 50);
    }
  };

  // Stagger animation for tour cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#fffbf9] min-h-screen">
      {/* Editorial Dark Header - Matching Transfers Page */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            poster="/image/tours-toppage.jpg"
          >
            <source src="/video/algarvexplorer-video-hero.mp4" type="video/mp4" />
          </video>
          {/* Scrim Overlay - Editorial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-[#da6927] transition-colors">{t('nav.home')}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80">{t('nav.tours')}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6 text-[#da6927]">
            <Plus size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">{t('tours.hero.eyebrow')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-montserrat text-white mb-8 tracking-tighter leading-none uppercase">
            {t('tours.hero.title')}
          </h1>
          <p className="text-white max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {t('tours.hero.desc')}
          </p>
        </div>
      </section>

      {/* Narrative & Stats */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#da6927]">{t('home.featured.eyebrow')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-montserrat text-brand-navy mb-12 tracking-tight uppercase leading-[1.1]">
              {t('home.about.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 mt-24">
            {[
              { label: t('tours.stats.adventures'), value: "150+" },
              { label: t('tours.stats.scouted'), value: "2,400km" },
              { label: t('tours.stats.explorers'), value: "5,000+" },
              { label: t('tours.stats.est'), value: "2016" }
            ].map((stat, i) => (
              <div key={i} className="border-l border-slate-100 pl-8">
                <span className="text-[#da6927] font-bold text-3xl md:text-4xl font-montserrat block mb-2">{stat.value}</span>
                <span className="text-brand-body/40 text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="relative pb-40 overflow-hidden">
        <AnimatedBlob
          className="top-[15%] -right-32"
          opacity={0.35}
          size="w-[700px] h-[700px]"
          duration="50s"
          blur="150px"
          blendMode="normal"
        />
        <AnimatedBlob
          className="bottom-[20%] -left-24"
          opacity={0.25}
          size="w-[500px] h-[500px]"
          duration="40s"
          delay="2s"
          blur="120px"
          alternate={true}
          blendMode="normal"
        />
        <AnimatedBlob
          className="top-[40%] left-[30%]"
          opacity={0.15}
          size="w-[400px] h-[400px]"
          duration="35s"
          delay="5s"
          blur="100px"
          blendMode="normal"
        />
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {TOURS.map((tour) => (
              <motion.div key={tour.id} variants={cardVariants}>
                <Link
                  to={`/tours/${tour.slug}`}
                  onClick={(e) => handleTourClick(e, tour)}
                  className="group block bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100 overflow-hidden"
                >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <ParallaxImage
                    src={tour.image}
                    alt={language === 'pt' ? tour.title_pt : tour.title}
                    className="object-cover"
                    scrollStrength={0.15}
                    mouseStrength={0.03}
                    objectPosition="center"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-[#0d4357] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                      {language === 'pt' ? tour.difficulty_pt : tour.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-[#da6927] text-[10px] font-bold uppercase tracking-[0.2em]">
                      {language === 'pt' ? tour.duration_pt : tour.duration}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="text-slate-400 text-[10px] uppercase tracking-widest font-medium">Verified Adventure</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0d4357] mb-8 font-montserrat uppercase tracking-tight leading-[1.1] group-hover:text-[#da6927] transition-colors duration-500">
                    {language === 'pt' ? tour.title_pt : tour.title}
                  </h3>
                  
                  <div className="flex items-end justify-between pt-8 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#da6927] mb-2">
                        {language === 'pt' ? 'A partir de' : 'Starting from'}
                      </span>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-bold text-[#0d4357] font-montserrat tracking-tighter">€{tour.price}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">/ pp</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-[#0d4357] group-hover:text-[#da6927] transition-all duration-500 transform group-hover:translate-x-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{language === 'pt' ? 'Explorar' : 'Explore'}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      </div>
    </PageTransition>
  );
};

export default Tours;