import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Send, Type, Check, HardDrive } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenDrive?: () => void;
}

export type FontTheme = 'neo-grotesque' | 'editorial-syne' | 'geometric-urbanist';

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact, onOpenDrive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [currentFontTheme, setCurrentFontTheme] = useState<FontTheme>('neo-grotesque');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_font_theme') as FontTheme;
    if (saved) {
      setCurrentFontTheme(saved);
      document.documentElement.setAttribute('data-font-theme', saved);
    } else {
      document.documentElement.setAttribute('data-font-theme', 'neo-grotesque');
    }
  }, []);

  const changeFontTheme = (theme: FontTheme) => {
    setCurrentFontTheme(theme);
    document.documentElement.setAttribute('data-font-theme', theme);
    localStorage.setItem('portfolio_font_theme', theme);
    setFontMenuOpen(false);
  };

  const fontOptions: { id: FontTheme; name: string; displayFace: string; bodyFace: string }[] = [
    {
      id: 'neo-grotesque',
      name: 'Neo-Grotesque Tech (New)',
      displayFace: 'Bricolage Grotesque',
      bodyFace: 'DM Sans',
    },
    {
      id: 'editorial-syne',
      name: 'Avant-Garde Editorial',
      displayFace: 'Syne',
      bodyFace: 'Plus Jakarta Sans',
    },
    {
      id: 'geometric-urbanist',
      name: 'Geometric Modern',
      displayFace: 'Urbanist',
      bodyFace: 'Manrope',
    },
  ];

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Featured Projects', href: '#projects' },
    { label: 'Interactive Lab', href: '#lab' },
    { label: 'Skills & Architecture', href: '#skills' },
    { label: 'Education', href: '#education' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-slate-100 group"
          >
            <span className="font-display font-bold text-xl tracking-tight group-hover:text-indigo-400 transition-colors">
              {PERSONAL_DETAILS.name}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Available
            </span>
          </a>

          {/* Zone 2: 4-5 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 text-slate-300 hover:text-slate-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions + Font Theme Selector */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Font Theme Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFontMenuOpen(!fontMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer"
                title="Change Typography / Font Theme"
              >
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden lg:inline text-[11px]">Font Theme</span>
              </button>

              <AnimatePresence>
                {fontMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 p-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 space-y-1"
                  >
                    <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Typography Theme
                    </div>
                    {fontOptions.map((opt) => {
                      const isCurrent = currentFontTheme === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => changeFontTheme(opt.id)}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between cursor-pointer ${
                            isCurrent
                              ? 'bg-indigo-600/20 text-white border border-indigo-500/40'
                              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{opt.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                              {opt.displayFace} / {opt.bodyFace}
                            </div>
                          </div>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-400 mt-1 shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {onOpenDrive && (
              <button
                onClick={onOpenDrive}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer"
                title="Google Drive Cloud Hub"
              >
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xl:inline text-[11px]">Drive</span>
              </button>
            )}

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 rounded-lg transition-all hover:border-slate-500 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Resume</span>
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setFontMenuOpen(!fontMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
              aria-label="Change Font Theme"
            >
              <Type className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              onClick={onOpenResume}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-800 bg-[#07090e]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Font Theme Selection */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                <span>Select Font Theme:</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {fontOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => changeFontTheme(opt.id)}
                    className={`px-3 py-2 rounded-lg text-xs text-left transition-colors flex items-center justify-between ${
                      currentFontTheme === opt.id
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <span>{opt.name}</span>
                    {currentFontTheme === opt.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              {onOpenDrive && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDrive();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-slate-900 rounded-lg border border-emerald-800/60 hover:bg-slate-800 transition-colors"
                >
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span>Google Drive Cloud Hub</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View Full Resume</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Contact Gajendran</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

