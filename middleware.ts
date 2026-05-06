import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match every path except API routes, _next internals, and any file with an extension
  // (so /favicon.png, /image/*.jpg, /sitemap.xml, /robots.txt are served untouched).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
