import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#fffbf9]">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#da6927] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-brand-navy text-sm font-light">Loading...</p>
    </div>
  </div>
);

// Lazy load all pages - reduces initial bundle by ~70%
const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const Transfers = lazy(() => import('./pages/Transfers'));
const About = lazy(() => import('./pages/About'));
const Algarve = lazy(() => import('./pages/Algarve'));
const Contacts = lazy(() => import('./pages/Contacts'));

// Components that should load immediately
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:slug" element={<TourDetail />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/about" element={<About />} />
                <Route path="/algarve" element={<Algarve />} />
                <Route path="/contacts" element={<Contacts />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;