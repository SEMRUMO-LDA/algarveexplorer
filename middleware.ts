import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const KIBAN_URL = process.env.NEXT_PUBLIC_KIBAN_API_URL || '';
const KIBAN_TENANT = process.env.NEXT_PUBLIC_KIBAN_TENANT || 'algarveexplorer';

type Hit = { to: string; type: string } | null;

const cache = new Map<string, { hit: Hit; exp: number }>();
const TTL_MS = 60_000;

async function resolveRedirect(path: string): Promise<Hit> {
  if (!KIBAN_URL) return null;
  const cached = cache.get(path);
  if (cached && cached.exp > Date.now()) return cached.hit;
  try {
    const r = await fetch(
      `${KIBAN_URL}/api/v1/redirects/resolve?path=${encodeURIComponent(path)}`,
      { headers: { Accept: 'application/json', 'X-Tenant': KIBAN_TENANT } }
    );
    if (!r.ok) {
      cache.set(path, { hit: null, exp: Date.now() + TTL_MS });
      return null;
    }
    const json = (await r.json()) as { data?: { to?: string; type?: string } | null };
    const hit: Hit =
      json?.data && json.data.to ? { to: json.data.to, type: json.data.type || '301' } : null;
    cache.set(path, { hit, exp: Date.now() + TTL_MS });
    return hit;
  } catch {
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  const hit = await resolveRedirect(req.nextUrl.pathname);
  if (hit) {
    const target = /^https?:\/\//i.test(hit.to)
      ? hit.to
      : new URL(hit.to, req.url).toString();
    return NextResponse.redirect(target, hit.type === '302' ? 302 : 301);
  }
  return intlMiddleware(req);
}

export const config = {
  // Match every path except API routes, _next internals, and any file with an extension
  // (so /favicon.png, /image/*.jpg, /sitemap.xml, /robots.txt are served untouched).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
