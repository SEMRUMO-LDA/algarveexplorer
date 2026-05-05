import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export (out/) so the site can be deployed to any plain HTTP host.
  // New tours added in KIBAN after build are still routable: the server
  // rewrites unknown /tours/<slug>/ requests to /tours/__/index.html (the
  // catch-all rendered by generateStaticParams), and the client fetches
  // the slug data from KIBAN at runtime. See out/.htaccess + DEPLOY.txt.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
