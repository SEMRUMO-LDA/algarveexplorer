
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './LanguageContext';
import { SensoryProvider } from './SensoryContext';
import { SharedImageProvider } from './components/SharedImageTransition';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Algarve from './pages/Algarve';
import Transfers from './pages/Transfers';
import About from './pages/About';
import Contacts from './pages/Contacts';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/algarve" element={<Algarve />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:slug" element={<TourDetail />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
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
            </div>
          </Router>
        </SharedImageProvider>
      </SensoryProvider>
    </LanguageProvider>
  );
};

export default App;
