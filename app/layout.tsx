// Root layout — Next.js requires one. The real layout (with <html>, <body>,
// providers) lives in app/[locale]/layout.tsx so it can read the active
// locale from the URL segment. Everything renders inside that.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
