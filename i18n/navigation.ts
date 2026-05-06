import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives. Use these everywhere instead of
 * `next/link` and `next/navigation` so links/redirects automatically keep
 * the active locale prefix (`/en/tours` stays on EN; default-locale paths
 * stay un-prefixed per `localePrefix: 'as-needed'`).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
