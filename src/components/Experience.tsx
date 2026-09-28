import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, Building2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceProps {
  onSelectProject?: (projectId: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onSelectProject }) => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            <span>Career Progression</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Commercial Experience</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Work Experience &amp; Engineering Roles
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Proven track record designing scalable frontend architectures, high-frequency trading interfaces, and modern mobile clients across commercial engineering firms.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Column (Desktop) */}
          <div className="lg:col-span-4 space-y-3">
            {EXPERIENCES.map((exp) => {
              const isActive = activeExpId === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/90 border-indigo-500/60 shadow-lg shadow-indigo-950/40'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-display font-bold text-base text-white">
                        {exp.company}
                      </div>
                      <div className="text-sm font-medium text-indigo-300 mt-0.5">
                        {exp.role}
                      </div>
                    </div>
                    {exp.isCurrent && (
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Present
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{exp.period}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8">
            {EXPERIENCES.map((exp) => {
              if (exp.id !== activeExpId) return null;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
                >
                  {/* Card Title Lockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-6">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {exp.role}
                      </h3>
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      <span>{exp.period}</span>
                      <span className="mx-2 text-slate-600">/</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Bullet Achievements */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Key Deliverables &amp; Architectural Contributions
                    </h4>
                    <ul className="space-y-3.5">
                      {exp.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applied Technologies (Clean unboxed inline text metadata with subtle typographic separators) */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-400 mb-2.5">
                      Stack &amp; Frameworks Deployed:
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300">
                      {exp.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="font-mono text-indigo-300/90">{tech}</span>
                          {idx < exp.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
