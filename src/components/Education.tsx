import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            <span>Academic Background</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Scientific Foundation</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white mt-2 tracking-tight">
            Education &amp; Quantitative Foundations
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl shadow-xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-800 text-indigo-400 mt-1">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {EDUCATION.degree}
                </h3>
                <div className="text-sm font-medium text-slate-300 mt-0.5">
                  {EDUCATION.institution}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{EDUCATION.duration}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{EDUCATION.location}</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Academic Standing</div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-0.5">
                {EDUCATION.grade}
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            {EDUCATION.description}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
