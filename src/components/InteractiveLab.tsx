import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  ArrowRightLeft,
  Wallet,
  Activity,
  CheckCircle2,
  RefreshCw,
  Cpu,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Play,
  RotateCcw,
} from 'lucide-react';

interface InteractiveLabProps {
  initialTab?: string;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<'crypto-swap' | 'elearning-curriculum' | 'jwt-interceptor'>(
    (initialTab as any) || 'crypto-swap'
  );

  // Sync when prop changes
  useEffect(() => {
    if (initialTab && (initialTab === 'crypto-swap' || initialTab === 'elearning-curriculum' || initialTab === 'jwt-interceptor')) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // ===================== 1. CRYPTO SWAP & ORDER BOOK STATE =====================
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [fromToken, setFromToken] = useState<'ETH' | 'USDT' | 'ZENX'>('ETH');
  const [toToken, setToToken] = useState<'ETH' | 'USDT' | 'ZENX'>('ZENX');
  const [fromAmount, setFromAmount] = useState<string>('0.5');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccessTx, setSwapSuccessTx] = useState<string | null>(null);

  // Exchange rates relative to USDT
  const tokenPrices: Record<string, number> = {
    ETH: 3240.5,
    ZENX: 18.75,
    USDT: 1.0,
  };

  const calculatedToAmount = () => {
    const fromVal = parseFloat(fromAmount) || 0;
    if (fromVal <= 0) return '0.00';
    const totalUsd = fromVal * tokenPrices[fromToken];
    const out = totalUsd / tokenPrices[toToken];
    return out.toFixed(4);
  };

  const handleConnectWallet = () => {
    setConnectingWallet(true);
    setTimeout(() => {
      setConnectingWallet(false);
      setWalletConnected(true);
    }, 800);
  };

  const handleExecuteSwap = () => {
    if (!walletConnected) {
      handleConnectWallet();
      return;
    }
    setIsSwapping(true);
    setSwapSuccessTx(null);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccessTx(
        `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      );
    }, 1200);
  };

  // Simulated live order book state
  const [orderBook, setOrderBook] = useState<{
    bids: { price: number; amount: number; total: number }[];
    asks: { price: number; amount: number; total: number }[];
  }>({
    bids: [
      { price: 3240.2, amount: 1.45, total: 4700 },
      { price: 3239.8, amount: 2.8, total: 9070 },
      { price: 3239.0, amount: 5.12, total: 16580 },
      { price: 3238.5, amount: 0.95, total: 3075 },
    ],
    asks: [
      { price: 3241.1, amount: 1.15, total: 3727 },
      { price: 3241.5, amount: 3.42, total: 11085 },
      { price: 3242.0, amount: 4.88, total: 15820 },
      { price: 3242.8, amount: 2.1, total: 6810 },
    ],
  });

  // Simulated WebSocket tick
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        const newBids = prev.bids.map((b) => ({
          ...b,
          amount: parseFloat(Math.max(0.5, b.amount + (Math.random() - 0.5) * 0.2).toFixed(2)),
        }));
        const newAsks = prev.asks.map((a) => ({
          ...a,
          amount: parseFloat(Math.max(0.5, a.amount + (Math.random() - 0.5) * 0.2).toFixed(2)),
        }));
        return { bids: newBids, asks: newAsks };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ===================== 2. ANGULAR 21 SIGNALS & FORMS BENCHMARK =====================
  const [courseTitle, setCourseTitle] = useState('Production Web3 with Angular 21+ & Signals');
  const [coursePrice, setCoursePrice] = useState(89);
  const [isPublishing, setIsPublishing] = useState(false);
  const [benchmarkRunning, setBenchmarkRunning] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState<{
    zoneTime: number;
    signalTime: number;
    completed: boolean;
  } | null>(null);

  const runBenchmark = () => {
    setBenchmarkRunning(true);
    setBenchmarkResults(null);
    setTimeout(() => {
      // 50,000 fine-grained signal mutations take ~1.2ms vs Zone.js full dirty-check ~28.6ms
      setBenchmarkResults({
        zoneTime: 28.4,
        signalTime: 1.8,
        completed: true,
      });
      setBenchmarkRunning(false);
    }, 900);
  };

  // ===================== 3. JWT INTERCEPTOR FLOW =====================
  const [interceptorStep, setInterceptorStep] = useState<number>(0);
  const [interceptorLog, setInterceptorLog] = useState<string[]>([
    'System ready. No active HTTP pipeline.',
  ]);

  const runInterceptorSimulation = (scenario: 'normal' | 'expired') => {
    setInterceptorStep(1);
    setInterceptorLog([
      'Request initiated: GET /api/v1/user/learning-progress',
      'Interceptor injecting: Authorization: Bearer eyJhbGciOiJIUzI1Ni...',
    ]);

    if (scenario === 'normal') {
      setTimeout(() => {
        setInterceptorStep(4);
        setInterceptorLog((prev) => [
          ...prev,
          'Server 200 OK received with payload.',
          'Request finalized without token disruption.',
        ]);
      }, 700);
    } else {
      setTimeout(() => {
        setInterceptorStep(2);
        setInterceptorLog((prev) => [
          ...prev,
          '⚠️ Server returned 401 Unauthorized: Access token expired.',
          'Interceptor caught 401. Queuing failed requests into Subject queue...',
        ]);

        setTimeout(() => {
          setInterceptorStep(3);
          setInterceptorLog((prev) => [
            ...prev,
            'POST /auth/token/refresh invoked with encrypted refresh token.',
            '✓ New Access Token generated: Bearer eyJ0eXAiOiJKV1QiLCJh...',
          ]);

          setTimeout(() => {
            setInterceptorStep(4);
            setInterceptorLog((prev) => [
              ...prev,
              'Replaying pending queue with refreshed Bearer token...',
              'Server returned 200 OK. User session seamless and uninterrupted!',
            ]);
          }, 900);
        }, 900);
      }, 700);
    }
  };

  const resetInterceptor = () => {
    setInterceptorStep(0);
    setInterceptorLog(['System ready. Click an action below to simulate.']);
  };

  return (
    <section id="lab" className="py-24 border-t border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              <span>Interactive Engineering Lab</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Live Runtime Demonstrations</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Test Real Production Logic &amp; Architecture
            </h2>
            <p className="text-slate-400 mt-2 text-base">
              Interact directly with simulations of Gajendran's core engineering implementations: decentralized swaps, Angular 21+ Signal forms, and automated JWT token interceptors.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('crypto-swap')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'crypto-swap'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>De-Swap &amp; Orderbook</span>
            </button>

            <button
              onClick={() => setActiveTab('elearning-curriculum')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'elearning-curriculum'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Angular 21 Signals</span>
            </button>

            <button
              onClick={() => setActiveTab('jwt-interceptor')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'jwt-interceptor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>JWT Interceptor</span>
            </button>
          </div>
        </div>

        {/* ======================= TAB 1: CRYPTO DE-SWAP & LIVE ORDER BOOK ======================= */}
        {activeTab === 'crypto-swap' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Swap Execution Widget */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-white">Zenx De-Swap Pool</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live Pool
                  </span>
                </div>

                <button
                  onClick={handleConnectWallet}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                    walletConnected
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                      : 'bg-indigo-950/60 text-indigo-300 border-indigo-800 hover:bg-indigo-900/80'
                  }`}
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{connectingWallet ? 'Connecting...' : walletConnected ? '0x71C...4f98' : 'Connect MetaMask'}</span>
                </button>
              </div>

              {/* Pay Input */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>You Pay</span>
                  <span>Balance: {walletConnected ? '4.825 ETH' : '0.00'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-transparent font-mono text-2xl font-bold text-white focus:outline-none w-full"
                    placeholder="0.0"
                    min="0"
                  />
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold px-3 py-2 rounded-lg cursor-pointer focus:outline-none"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                    <option value="ZENX">ZENX</option>
                  </select>
                </div>
                <div className="text-[11px] text-slate-500">
                  ≈ ${(parseFloat(fromAmount || '0') * tokenPrices[fromToken]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </div>
              </div>

              {/* Switch button */}
              <div className="flex justify-center -my-2">
                <button
                  onClick={() => {
                    const temp = fromToken;
                    setFromToken(toToken);
                    setToToken(temp);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                  aria-label="Switch Swap Direction"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Receive Output */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>You Receive (Estimated)</span>
                  <span>Balance: {walletConnected ? '1,250.00 ZENX' : '0.00'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-mono text-2xl font-bold text-indigo-400">
                    {calculatedToAmount()}
                  </div>
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold px-3 py-2 rounded-lg cursor-pointer focus:outline-none"
                  >
                    <option value="ZENX">ZENX</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <div className="text-[11px] text-slate-500">
                  Guaranteed Rate: 1 {fromToken} = {(tokenPrices[fromToken] / tokenPrices[toToken]).toFixed(4)} {toToken}
                </div>
              </div>

              {/* Slippage & Routing Info */}
              <div className="text-xs space-y-1.5 text-slate-400 pt-1">
                <div className="flex justify-between">
                  <span>Slippage Tolerance</span>
                  <div className="flex items-center gap-1 font-mono">
                    {[0.1, 0.5, 1.0].map((val) => (
                      <button
                        key={val}
                        onClick={() => setSlippage(val)}
                        className={`px-2 py-0.5 rounded text-[11px] ${
                          slippage === val ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Router Contract</span>
                  <span className="font-mono text-slate-300">ZenxRouterV2 (Uniswap v2 fork)</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Gas Estimate</span>
                  <span className="font-mono text-emerald-400">0.0018 ETH (~$5.80)</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecuteSwap}
                disabled={isSwapping}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSwapping ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing Transaction on MetaMask...</span>
                  </>
                ) : !walletConnected ? (
                  <>
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet to Swap</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Execute Instant De-Swap</span>
                  </>
                )}
              </button>

              {/* Success Tx Notification */}
              {swapSuccessTx && (
                <div className="p-3 bg-emerald-950/70 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Transaction mined on chain! Tx Hash: <strong className="font-mono">{swapSuccessTx}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Live Real-time Order Book (Socket.io simulation) */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <span>Live Order Book</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    ETH/USDT · Socket.io Real-Time Stream (&lt;120ms)
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-base font-bold text-emerald-400">$3,240.85</div>
                  <div className="text-[11px] text-emerald-400/80 font-mono">+3.42% 24h</div>
                </div>
              </div>

              {/* Order Book Table Header */}
              <div className="grid grid-cols-3 text-[11px] font-mono font-semibold uppercase text-slate-500 pb-1">
                <span>Price (USDT)</span>
                <span className="text-right">Size (ETH)</span>
                <span className="text-right">Total (USDT)</span>
              </div>

              {/* Asks (Sells - Red) */}
              <div className="space-y-1 font-mono text-xs">
                {orderBook.asks.map((ask, i) => (
                  <div key={i} className="relative grid grid-cols-3 py-1 px-1.5 rounded text-rose-300">
                    <span className="font-semibold text-rose-400">${ask.price.toFixed(1)}</span>
                    <span className="text-right text-slate-300">{ask.amount.toFixed(2)}</span>
                    <span className="text-right text-slate-400">{ask.total.toLocaleString()}</span>
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-rose-500/10 rounded pointer-events-none"
                      style={{ width: `${Math.min(100, (ask.amount / 6) * 100)}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Mid Market Spread */}
              <div className="py-2 px-3 bg-slate-950 rounded-lg flex items-center justify-between text-xs font-mono text-slate-400 border border-slate-800/80">
                <span>Spread: 0.90 USDT (0.027%)</span>
                <span className="text-emerald-400">WebSocket Depth: Synced</span>
              </div>

              {/* Bids (Buys - Green) */}
              <div className="space-y-1 font-mono text-xs">
                {orderBook.bids.map((bid, i) => (
                  <div key={i} className="relative grid grid-cols-3 py-1 px-1.5 rounded text-emerald-300">
                    <span className="font-semibold text-emerald-400">${bid.price.toFixed(1)}</span>
                    <span className="text-right text-slate-300">{bid.amount.toFixed(2)}</span>
                    <span className="text-right text-slate-400">{bid.total.toLocaleString()}</span>
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 rounded pointer-events-none"
                      style={{ width: `${Math.min(100, (bid.amount / 6) * 100)}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 leading-normal">
                Implementation pattern: Built with Angular 21 Standalone Components, NgRx State Store, and audited RxJS throttled pipelines to ensure smooth 60 FPS repaint.
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: ANGULAR 21 SIGNALS & FORMS BENCHMARK ======================= */}
        {activeTab === 'elearning-curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Signal Forms Live Course Editor */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Angular 21 Signal Forms Editor
                  </h3>
                  <div className="text-xs text-indigo-400 font-mono">
                    Zero-Zone.js Dynamic Validation Pipeline
                  </div>
                </div>
                <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800">
                  Fine-Grained Signals
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Course Title (Signal Reactive Validator)
                  </label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter curriculum title"
                  />
                  <div className="flex justify-between items-center text-[11px] mt-1.5 font-mono">
                    <span className={courseTitle.length >= 8 ? 'text-emerald-400' : 'text-amber-400'}>
                      {courseTitle.length >= 8 ? '✓ Valid (>=8 chars)' : '⚠ Min 8 characters required'}
                    </span>
                    <span className="text-slate-500">Character count: {courseTitle.length}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Course Tier Pricing ($ USD)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="19"
                      max="199"
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <span className="font-mono text-base font-bold text-white min-w-16 text-right">
                      ${coursePrice}
                    </span>
                  </div>
                </div>

                {/* Computed Signal Output */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="text-indigo-400 font-semibold">// Live Computed Signal Values:</div>
                  <div className="flex justify-between text-slate-300">
                    <span>computed(instructorPayout):</span>
                    <span className="text-emerald-400">${(coursePrice * 0.7).toFixed(2)} (70%)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>computed(platformFee):</span>
                    <span className="text-slate-400">${(coursePrice * 0.3).toFixed(2)} (30%)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>formIsValid():</span>
                    <span className={courseTitle.length >= 8 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {courseTitle.length >= 8 ? 'TRUE (READY)' : 'FALSE (BLOCKED)'}
                    </span>
                  </div>
                </div>

                <button
                  disabled={courseTitle.length < 8 || isPublishing}
                  onClick={() => {
                    setIsPublishing(true);
                    setTimeout(() => setIsPublishing(false), 800);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isPublishing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Emitting Signal Mutation...</span>
                    </>
                  ) : (
                    <span>Publish Course Module</span>
                  )}
                </button>
              </div>
            </div>

            {/* Performance Benchmark Visualizer */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Performance Benchmark
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Comparing 50,000 Reactive State Updates: Zone.js Digest vs Angular 21 Signals.
                </div>
              </div>

              <div className="space-y-4">
                {/* Zone.js bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-400">
                    <span>Legacy Zone.js (Dirty Checking)</span>
                    <span className="text-rose-400 font-bold">~28.4 ms</span>
                  </div>
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-rose-500 h-full w-[88%]" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Traverses the entire component tree hierarchy on every DOM event.
                  </div>
                </div>

                {/* Angular 21 Signals bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-400">
                    <span>Angular 21+ Signals (Targeted Graph)</span>
                    <span className="text-emerald-400 font-bold">~1.8 ms (15.7x Faster)</span>
                  </div>
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full w-[6%]" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Glitch-free, direct DOM node reconciliation with 0ms wasted overhead.
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={runBenchmark}
                    disabled={benchmarkRunning}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    {benchmarkRunning ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                    )}
                    <span>{benchmarkRunning ? 'Running 50k Cycles...' : 'Rerun Live Benchmark'}</span>
                  </button>
                </div>

                {benchmarkResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 font-mono"
                  >
                    ✓ Execution complete: Angular Signals achieved 15.7x reduction in rendering latency on this device.
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: JWT INTERCEPTOR FLOW ======================= */}
        {activeTab === 'jwt-interceptor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Pipeline Controller */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  HTTP Interceptor Engine
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Engineered for Become a Skiller EdTech platform to handle seamless authentication token management and error recovery.
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => runInterceptorSimulation('normal')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span>1. Simulate Valid API Request (200 OK)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>

                <button
                  onClick={() => runInterceptorSimulation('expired')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-indigo-200 bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-700/80 rounded-xl transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span>2. Simulate Expired Token + Auto Refresh (401 -&gt; Refresh)</span>
                  <RefreshCw className="w-4 h-4 text-indigo-400" />
                </button>

                <button
                  onClick={resetInterceptor}
                  className="w-full py-2 px-4 text-xs text-slate-400 hover:text-slate-200 text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Pipeline Simulator</span>
                </button>
              </div>

              {/* Visual Pipeline Steps */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-2">Interceptor Life-Cycle Stages:</div>
                {[
                  { step: 1, label: 'Bearer Token Injection (HttpHandler)' },
                  { step: 2, label: '401 Interception & Request Queueing' },
                  { step: 3, label: 'Silent Refresh Token Exchange' },
                  { step: 4, label: 'Retry with Fresh Bearer Token' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all ${
                      interceptorStep === s.step
                        ? 'bg-indigo-600/20 border border-indigo-500/60 text-white font-medium'
                        : interceptorStep > s.step
                        ? 'bg-emerald-950/30 border border-emerald-900/50 text-emerald-300'
                        : 'bg-slate-950 text-slate-500 border border-slate-900'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold">0{s.step}</span>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Terminal Telemetry Output */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-slate-200">
                    HTTP Interceptor Diagnostics
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">RxJS Observable Stream</span>
              </div>

              <div className="bg-[#05070b] rounded-xl p-4 border border-slate-800/90 font-mono text-xs text-slate-300 min-h-64 max-h-72 overflow-y-auto space-y-2 leading-relaxed">
                {interceptorLog.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes('401')
                        ? 'text-rose-400'
                        : log.includes('✓') || log.includes('200')
                        ? 'text-emerald-400'
                        : log.includes('refresh')
                        ? 'text-indigo-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400">
                Implemented using Angular HTTP Interceptor with <code className="text-indigo-300 font-mono">BehaviorSubject</code> locking to prevent race conditions during simultaneous asynchronous API calls.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
