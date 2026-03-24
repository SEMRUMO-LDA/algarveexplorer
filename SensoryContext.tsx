import React, { createContext, useContext, useEffect, useState } from 'react';

type Mood = 'morning' | 'day' | 'sunset' | 'night';

interface SensoryContextType {
  mood: Mood;
  portugalTime: string;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

export const SensoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mood, setMood] = useState<Mood>('day');
  const [portugalTime, setPortugalTime] = useState('');

  useEffect(() => {
    const updateMood = () => {
      const now = new Date();
      
      // Calculate Portugal Time (WET/WEST)
      // For simplicity, we use UTC and adjust. 
      // In winter (Nov-Mar) it's UTC+0. In summer (Apr-Oct) it's UTC+1.
      // Accurate DST check for Portugal:
      const year = now.getUTCFullYear();
      const lastSundayMarch = new Date(Date.UTC(year, 2, 31));
      lastSundayMarch.setUTCDate(31 - lastSundayMarch.getUTCDay());
      const lastSundayOctober = new Date(Date.UTC(year, 9, 31));
      lastSundayOctober.setUTCDate(31 - lastSundayOctober.getUTCDay());
      
      const isDST = now > lastSundayMarch && now < lastSundayOctober;
      const offset = isDST ? 1 : 0;
      
      const ptHour = (now.getUTCHours() + offset) % 24;
      const ptMinutes = now.getUTCMinutes();
      const ptTime = ptHour + ptMinutes / 60; // Decimal time for precision
      
      const timeStr = `${ptHour.toString().padStart(2, '0')}:${ptMinutes.toString().padStart(2, '0')}`;
      setPortugalTime(timeStr);

      // Determine Mood
      let currentMood: Mood = 'day';
      if (ptTime >= 6 && ptTime < 10) {
        currentMood = 'morning';
      } else if (ptTime >= 10 && ptTime < 17) {
        currentMood = 'day';
      } else if (ptTime >= 17 && ptTime < 20.5) { // 20:30
        currentMood = 'sunset';
      } else {
        currentMood = 'night';
      }
      
      setMood(currentMood);

      // Inject CSS Variables
      const root = document.documentElement;
      
      const palettes = {
        morning: {
          color1: 'rgba(180, 225, 255, 1)',
          color2: 'rgba(255, 255, 255, 0.8)',
          scale: '1',
          opacity: '0.25'
        },
        day: {
          color1: 'rgba(218, 105, 39, 1)',
          color2: 'rgba(255, 180, 100, 0.8)',
          scale: '1',
          opacity: '0.3'
        },
        sunset: {
          color1: 'rgba(235, 90, 50, 1)',
          color2: 'rgba(255, 120, 20, 0.8)',
          scale: '1.25', // Sunset blobs are larger
          opacity: '0.45'
        },
        night: {
          color1: 'rgba(20, 48, 80, 1)',
          color2: 'rgba(13, 67, 87, 0.6)',
          scale: '0.9',
          opacity: '0.2'
        }
      };

      const selected = palettes[currentMood];
      root.style.setProperty('--blob-color-1', selected.color1);
      root.style.setProperty('--blob-color-2', selected.color2);
      root.style.setProperty('--blob-scale', selected.scale);
      root.style.setProperty('--blob-opacity-base', selected.opacity);
    };

    updateMood();
    const interval = setInterval(updateMood, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <SensoryContext.Provider value={{ mood, portugalTime }}>
      {children}
    </SensoryContext.Provider>
  );
};

export const useSensoryTheme = () => {
  const context = useContext(SensoryContext);
  if (context === undefined) {
    throw new Error('useSensoryTheme must be used within a SensoryProvider');
  }
  return context;
};
