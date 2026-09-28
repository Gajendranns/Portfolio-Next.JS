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
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-indigo-200">
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

        {/* Experience Timeline */}
        <Experience />

        {/* Featured Projects with Dynamic Bento Grid */}
        <Projects
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenLab={handleOpenLab}
        />

        {/* Interactive Engineering Lab (Crypto Swap / Angular Signals / JWT Interceptor) */}
        <InteractiveLab initialTab={activeLabDemo} />

        {/* Technical Skills & Architecture Matrix */}
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
