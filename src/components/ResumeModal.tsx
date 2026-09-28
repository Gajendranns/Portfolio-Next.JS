import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, HardDrive } from 'lucide-react';
import { PERSONAL_DETAILS, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, EDUCATION } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDrive?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onOpenDrive }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          {/* Top Bar for Modal Actions */}
          <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span>Curriculum Vitae</span>
              <span className="text-slate-600">/</span>
              <span className="text-indigo-400 font-mono">Gajendran_NS_Resume.pdf</span>
            </div>

            <div className="flex items-center gap-2">
              {onOpenDrive && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDrive();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 rounded-lg border border-emerald-800 transition-colors cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save to Google Drive</span>
                </button>
              )}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-indigo-400" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Resume"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Container */}
          <div className="p-6 sm:p-10 overflow-y-auto bg-slate-950 text-slate-200 text-xs sm:text-sm font-sans space-y-7 leading-relaxed">
            {/* Header */}
            <div className="border-b border-slate-800 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
                    GAJENDRAN N.S
                  </h1>
                  <div className="text-sm font-semibold text-indigo-400 mt-1">
                    Frontend Developer | Angular | React | Web3
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{PERSONAL_DETAILS.fullAddress}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 font-mono text-slate-300 sm:text-right">
                  <div className="flex sm:justify-end items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{PERSONAL_DETAILS.phone}</span>
                  </div>
                  <div className="flex sm:justify-end items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <a href={`mailto:${PERSONAL_DETAILS.email}`} className="hover:text-indigo-300">
                      {PERSONAL_DETAILS.email}
                    </a>
                  </div>
                  <div className="flex sm:justify-end items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-indigo-400" />
                    <a href={PERSONAL_DETAILS.github} target="_blank" rel="noreferrer" className="hover:text-indigo-300">
                      github.com/{PERSONAL_DETAILS.githubUsername}
                    </a>
                  </div>
                  <div className="flex sm:justify-end items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                    <a href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-300">
                      linkedin.com/in/{PERSONAL_DETAILS.linkedinUsername}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
                Professional Experience
              </h2>
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-medium">
                    <div>
                      <span className="font-bold text-white text-sm">{exp.role}</span>
                      <span className="text-slate-400"> | {exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 italic">{exp.location}</div>
                  <ul className="list-disc list-outside pl-4 space-y-1.5 text-slate-300 text-xs leading-normal">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Projects */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
                Featured Projects
              </h2>
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="font-bold text-white text-sm">{proj.title}</div>
                  <div className="text-xs text-indigo-300 italic">{proj.subtitle}</div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-300 text-xs">
                    {proj.keyFeatures.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                  <div className="text-xs text-slate-400 font-mono pt-1">
                    <strong className="text-slate-300">Technologies:</strong> {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Skills & Competencies */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
                Technical Skills &amp; Competencies
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-200">Languages:</strong> TypeScript, JavaScript (ES6+), HTML5, CSS3/SCSS
                </div>
                <div>
                  <strong className="text-slate-200">Frontend Frameworks:</strong> Angular (v16 - v21+), React.js, React Native
                </div>
                <div>
                  <strong className="text-slate-200">Architecture &amp; State:</strong> Angular Signals, Signal Forms, Signal Store, NgRx Store, Standalone Architecture, Lazy Loading, HTTP Interceptors
                </div>
                <div>
                  <strong className="text-slate-200">Web3 &amp; Blockchain:</strong> Web3.js, MetaMask Integration, Smart Contract Interaction, DeFi / De-Swap, NFT Marketplace, TradingView Charting
                </div>
                <div>
                  <strong className="text-slate-200">UI Libraries &amp; Tools:</strong> Spartan UI, Angular Material, Tailwind CSS, Bootstrap, RxJS, Bun, npm / pnpm, Vite, Git, GitHub, VS Code, Postman, Angular CLI, Chrome DevTools
                </div>
                <div>
                  <strong className="text-slate-200">Concepts &amp; Practices:</strong> Socket.io (WebSockets), Single Page Applications (SPA), RESTful APIs, Cross-Browser Compatibility, Performance Optimization, Agile/Scrum, Problem Solving
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
                Education
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{EDUCATION.degree}</span>
                  <div className="text-slate-400">{EDUCATION.institution}, {EDUCATION.location}</div>
                </div>
                <div className="text-xs font-mono text-slate-400 sm:text-right mt-1 sm:mt-0">
                  <div>{EDUCATION.duration}</div>
                  <div className="text-emerald-400 font-bold">{EDUCATION.grade}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
