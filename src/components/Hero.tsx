'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenResume: () => void;
  onOpenLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenResume, onOpenLab }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'signals' | 'web3' | 'sockets'>('signals');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const codeSnippets = {
    signals: `// Angular 21+ Signal Store & Forms Architecture
@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <div class="stat">Token Balance: {{ balance() }}</div>
    <div class="stat">24h Vol: \${{ volumeComputed() }}</div>
  \`
})
export class OrderbookStore {
  readonly balance = signal<number>(1420.50);
  readonly volumeComputed = computed(() => this.balance() * 2840.15);
}`,
    web3: `// Web3.js & MetaMask Decentralized De-Swap Pipeline
async function executeDeSwap(tokenIn: string, amount: bigint) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const swapRouter = new ethers.Contract(ROUTER_ADDR, ABI, signer);
  
  // EIP-712 typed signature & liquidity pool execution
  const tx = await swapRouter.swapExactTokensForTokens(
    amount, minOutput, [tokenIn, WETH], signer.address, deadline
  );
  return tx.wait();
}`,
    sockets: `// Socket.io Real-Time Order Book Depth Stream
this.socket.fromEvent<OrderDepthUpdate>('depthUpdate')
  .pipe(
    filter(depth => depth.symbol === this.activePair()),
    auditTime(16), // Synchronize with 60 FPS requestAnimationFrame
    takeUntilDestroyed()
  )
  .subscribe(delta => {
    this.orderBookStore.applyDelta(delta);
  });`,
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy & Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Editorial kicker without pill wrapper */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              <span>Frontend Developer</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Angular 21+ &amp; React</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Web3 Specialist</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Engineering High-Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">Web3 Exchanges</span> &amp; Modern Enterprise Frontends.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Specialized in building mission-critical trading platforms, decentralized finance interfaces, and modular applications. Spearheading production implementations with Angular 21+ Standalone Signals, Web3.js, MetaMask, and sub-120ms WebSocket architectures.
            </p>

            {/* Proof Metric Adjacency */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-slate-800/80 max-w-xl">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Standalone &amp; Signals</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">+40%</div>
                <div className="text-xs text-slate-400 mt-0.5">FCP Route Optimization</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">&lt;120ms</div>
                <div className="text-xs text-slate-400 mt-0.5">WebSocket Order Sync</div>
              </div>
            </div>

            {/* Interactive Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLab}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Launch Interactive Lab</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer hover:underline underline-offset-4"
              >
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Quick contact info */}
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span>{PERSONAL_DETAILS.location}</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                <span>{PERSONAL_DETAILS.email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Workspace Graphic & Live Code Inspector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Smooth Floating Badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 shadow-xl text-xs font-mono text-indigo-300"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Angular 21+ Signals</span>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 shadow-xl text-xs font-mono text-emerald-300"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>MetaMask · Web3.js</span>
            </motion.div>

            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden group">
              {/* Header image banner with measured contrast scrim */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_developer_workspace_1790611849130.jpg"
                  alt="Developer high-performance engineering workstation"
                  className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-200">
                  <Terminal className="w-3 h-3 text-indigo-400 animate-pulse" />
                  <span>runtime.env // production</span>
                </div>
              </div>

              {/* Code Inspector Tabs */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    Core Architecture Stacks
                  </span>
                  
                  {/* Segmented controls */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setActiveSnippetTab('signals')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                        activeSnippetTab === 'signals'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Signals
                    </button>
                    <button
                      onClick={() => setActiveSnippetTab('web3')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                        activeSnippetTab === 'web3'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Web3.js
                    </button>
                    <button
                      onClick={() => setActiveSnippetTab('sockets')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                        activeSnippetTab === 'sockets'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Sockets
                    </button>
                  </div>
                </div>

                {/* Code Terminal View */}
                <div className="bg-[#05070b] rounded-xl p-3.5 border border-slate-800/90 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-52">
                  <motion.pre
                    key={activeSnippetTab}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-pre"
                  >
                    <code>{codeSnippets[activeSnippetTab]}</code>
                  </motion.pre>
                </div>

                {/* Micro tech pills replaced with clean unboxed text metadata */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Verified on Angular 21.x &amp; Ethers/Web3
                  </span>
                  <button
                    onClick={onOpenLab}
                    className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-transform hover:translate-x-0.5"
                  >
                    <span>Test in Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
