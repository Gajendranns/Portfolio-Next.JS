import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gajendran N.S Portfolio | Frontend & Web3 Developer',
  description:
    'Portfolio of Gajendran N.S — Frontend Developer specializing in Angular (v16-21+), React, Web3, DeFi platforms, and high-performance UI engineering.',
  openGraph: {
    title: 'Gajendran N.S Portfolio | Frontend & Web3 Developer',
    description:
      'Portfolio of Gajendran N.S — Frontend Developer specializing in Angular (v16-21+), React, Web3, DeFi platforms, and high-performance UI engineering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-font-theme="neo-grotesque">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;600;800&family=Plus+Jakarta+Sans:wght@400;600;700&family=Syne:wght@600;700;800&family=Urbanist:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090e] text-slate-100 antialiased selection:bg-indigo-600/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
