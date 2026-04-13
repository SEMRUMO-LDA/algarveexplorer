'use client';

import { LanguageProvider } from '@/lib/LanguageContext';
import { SensoryProvider } from '@/lib/SensoryContext';
import { SharedImageProvider } from '@/components/SharedImageTransition';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SensoryProvider>
        <SharedImageProvider>
          {children}
        </SharedImageProvider>
      </SensoryProvider>
    </LanguageProvider>
  );
}
