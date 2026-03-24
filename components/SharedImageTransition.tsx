import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageTransitionState {
  imageUrl: string;
  startRect: DOMRect | null;
  isTransitioning: boolean;
}

interface SharedImageContextType {
  startTransition: (imageUrl: string, element: HTMLElement) => void;
  transitionState: ImageTransitionState;
  completeTransition: () => void;
}

const SharedImageContext = createContext<SharedImageContextType | undefined>(undefined);

export const useSharedImage = () => {
  const context = useContext(SharedImageContext);
  if (!context) {
    throw new Error('useSharedImage must be used within SharedImageProvider');
  }
  return context;
};

export const SharedImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transitionState, setTransitionState] = useState<ImageTransitionState>({
    imageUrl: '',
    startRect: null,
    isTransitioning: false
  });

  const startTransition = useCallback((imageUrl: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setTransitionState({
      imageUrl,
      startRect: rect,
      isTransitioning: true
    });

    // Complete transition after animation duration
    setTimeout(() => {
      setTransitionState(prev => ({ ...prev, isTransitioning: false }));
    }, 1200); // Match this to your animation duration
  }, []);

  const completeTransition = useCallback(() => {
    setTransitionState({
      imageUrl: '',
      startRect: null,
      isTransitioning: false
    });
  }, []);

  return (
    <SharedImageContext.Provider value={{ startTransition, transitionState, completeTransition }}>
      {children}
      <AnimatePresence>
        {transitionState.isTransitioning && transitionState.startRect && (
          <motion.div
            className="fixed z-[9999] overflow-hidden"
            initial={{
              top: transitionState.startRect.top,
              left: transitionState.startRect.left,
              width: transitionState.startRect.width,
              height: transitionState.startRect.height,
              borderRadius: '1rem' // Match your card border radius
            }}
            animate={{
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: '0rem'
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1] // Cinematic easing
            }}
          >
            <motion.img
              src={transitionState.imageUrl}
              alt="Transitioning"
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1]
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d4357]/80 via-[#0d4357]/20 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </SharedImageContext.Provider>
  );
};

export default SharedImageProvider;
