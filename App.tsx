
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MatrixLoader from './components/MatrixLoader';
import Header from './components/Header';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIMentor from './components/AIMentor';
import { AppStateProvider } from './context/AppStateContext';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for the matrix loading experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppStateProvider>
      <div className="bg-[#050505] text-white min-h-screen selection:bg-teal-500/30">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <MatrixLoader key="loader" onComplete={() => setIsLoading(false)} />
          ) : (
            <main key="main" className="relative">
              <Header />
              <div className="relative">
                <Hero />
                <Showcase />
                <Pricing />
                <Contact />
              </div>
              <Footer />
              <AIMentor />
            </main>
          )}
        </AnimatePresence>
      </div>
    </AppStateProvider>
  );
};

export default App;
