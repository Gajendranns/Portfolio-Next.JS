import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveLab } from './components/InteractiveLab';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { CursorSpotlight, ScrollProgressBar } from './components/CursorSpotlight';
import { AnimatedMarquee } from './components/AnimatedMarquee';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeLabDemo, setActiveLabDemo] = useState<string>('crypto-swap');

  const handleOpenLab = (demoType?: string) => {
    if (demoType) {
      setActiveLabDemo(demoType);
    }
    const labEl = document.getElementById('lab');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProjects = () => {
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-indigo-200 relative">
      {/* Smooth Scroll Progress Bar at the very top of viewport */}
      <ScrollProgressBar />

      {/* Ambient Mouse Follow Spotlight (Desktop) */}
      <CursorSpotlight />

      {/* Navigation Top Bar (Strict 3-zone contract) */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProjects={handleExploreProjects}
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenLab={() => handleOpenLab('crypto-swap')}
        />

        {/* Dynamic Infinite Marquee Ribbon 1 */}
        <AnimatedMarquee
          items={[
            'Angular 21+ Standalone',
            'Signals Reactive Architecture',
            'MetaMask & Web3.js',
            'Socket.io <120ms Latency',
            'Zenx Crypto Exchange',
            'JWT Auto-Refresh Interceptor',
            'Tailwind CSS & Spartan UI',
            'React & React Native',
            '100% Zero-NgModule',
          ]}
          speed={32}
        />

        {/* Experience Timeline */}
        <Experience />

        {/* Featured Projects with Dynamic Bento Grid */}
        <Projects
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenLab={handleOpenLab}
        />

        {/* Dynamic Infinite Marquee Ribbon 2 */}
        <AnimatedMarquee
          items={[
            'P2P Escrow Engine',
            'Interactive TradingView Candlesticks',
            'Dynamic Signal Forms',
            'De-Swap Liquidity Routing',
            'Route-Level Lazy Loading',
            'Sub-second State Mutations',
            'TypeScript Strict Mode',
          ]}
          direction="right"
          speed={28}
        />

        {/* Interactive Engineering Lab (Crypto Swap / Angular Signals / JWT Interceptor) */}
        <InteractiveLab initialTab={activeLabDemo} />

        {/* Technical Skills & Architecture Matrix (with Animated Bars & Radar Charts) */}
        <Skills />

        {/* Academic Foundation */}
        <Education />

        {/* Contact & Inquiries */}
        <ContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Lightbox / Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLab={handleOpenLab}
      />

      {/* Printable / Interactive Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
