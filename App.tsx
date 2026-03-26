
import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './LanguageContext';
import { SensoryProvider } from './SensoryContext';
import { SharedImageProvider } from './components/SharedImageTransition';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import CookieNotice from './components/CookieNotice';

// Lazy loaded routes for senior-level bundle size optimization
const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const Algarve = lazy(() => import('./pages/Algarve'));
const Transfers = lazy(() => import('./pages/Transfers'));
const About = lazy(() => import('./pages/About'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Privacy = lazy(() => import('./pages/Privacy'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Fallback loader while chunks are downloading
const PageLoader = () => (
  <div className="min-h-screen bg-[#fffbf9] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#0d4357]/20 border-t-[#da6927] rounded-full animate-spin"></div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense key={location.pathname} fallback={<PageLoader />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/algarve" element={<Algarve />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetail />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SensoryProvider>
        <SharedImageProvider>
          <Router>
            <MagneticCursor />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <AnimatedRoutes />
              </main>
              <Footer />
              <Assistant />
              <CookieNotice />
            </div>
          </Router>
        </SharedImageProvider>
      </SensoryProvider>
    </LanguageProvider>
  );
};

export default App;
