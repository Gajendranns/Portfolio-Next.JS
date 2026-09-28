'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Use dynamic import with ssr: false for client-only components that rely on window/canvas/web3
const PortfolioApp = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400 font-mono text-xs">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
        <span>Loading Gajendran N.S Portfolio...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  return <PortfolioApp />;
}
