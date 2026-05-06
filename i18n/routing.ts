import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  // Default locale (PT) is served at `/`; other locales are prefixed (`/en/...`).
  // Preserves all existing PT URLs and the SEO authority already indexed.
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
