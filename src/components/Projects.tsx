import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers, ArrowUpRight, Zap, Play, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onOpenLab: (demoType?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, onOpenLab }) => {
  const [filter, setFilter] = useState<'all' | 'web3' | 'enterprise' | 'mobile'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              <span>Production Portfolio</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Flagship Engineering</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Featured Systems &amp; Deployed Projects
            </h2>
            <p className="text-slate-400 mt-2 text-base">
              Deep dive into decentralized crypto exchanges, enterprise learning platforms with Angular 21+ signals, and cross-platform native mobile applications.
            </p>
          </div>

          {/* Interactive Filter Segmented Controls */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('web3')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'web3'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Web3 &amp; Crypto
            </button>
            <button
              onClick={() => setFilter('enterprise')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'enterprise'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Enterprise LMS
            </button>
            <button
              onClick={() => setFilter('mobile')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mobile &amp; App
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-indigo-500/60 transition-colors duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-950/30"
            >
              {/* Media Thumbnail Container with zero broken images policy & hover zoom */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container in case of error
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Overlay quick action on thumbnail */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Metrics ribbon */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span>{project.metrics[0].label}:</span>
                    <span className="text-indigo-300 font-semibold">{project.metrics[0].value}</span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed category kicker */}
                  <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                    {project.category === 'web3'
                      ? 'Web3 / DeFi Exchange'
                      : project.category === 'enterprise'
                      ? 'Angular 21+ LMS'
                      : 'Cross-Platform Mobile'}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="font-display text-xl font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                  </h3>

                  {/* Subtitle / summary */}
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>

                {/* Tech list as clean unboxed inline text with typographic separators */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-medium text-slate-400 mb-1.5">
                    Stack:
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300 font-mono">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-300">{tech}</span>
                        {i < 3 && i < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-slate-500 text-[11px]">+{project.technologies.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Functional interactive actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Case Study &amp; Architecture
                  </button>

                  <button
                    onClick={() => onOpenLab(project.liveDemoType)}
                    className="py-2 px-3 text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-800/60 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    title="Run live interactive demonstration"
                  >
                    <Play className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
