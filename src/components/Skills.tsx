import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Layers,
  Cpu,
  Database,
  Wrench,
  Shield,
  BarChart3,
  Radar as RadarIcon,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { SKILL_CATEGORIES, SKILL_RADAR_DATA } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'bars' | 'charts'>('bars');
  const [selectedSlug, setSelectedSlug] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categoryIcons: Record<string, React.ReactNode> = {
    frameworks: <Layers className="w-4 h-4 text-sky-400 shrink-0" />,
    architecture: <Cpu className="w-4 h-4 text-purple-400 shrink-0" />,
    web3: <Database className="w-4 h-4 text-emerald-400 shrink-0" />,
    languages: <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />,
    'ui-styling': <Wrench className="w-4 h-4 text-amber-400 shrink-0" />,
    tooling: <Shield className="w-4 h-4 text-rose-400 shrink-0" />,
  };

  const filteredCategories =
    selectedSlug === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.slug === selectedSlug);

  // Horizontal bar chart data for top high-frequency skills
  const topSkillsData = [
    { name: 'Angular 21+ & Signals', proficiency: 96, category: 'Frontend' },
    { name: 'TypeScript', proficiency: 95, category: 'Core' },
    { name: 'Tailwind CSS', proficiency: 95, category: 'UI' },
    { name: 'MetaMask & Web3.js', proficiency: 94, category: 'Web3' },
    { name: 'HTTP Interceptors', proficiency: 94, category: 'Architecture' },
    { name: 'Socket.io WebSockets', proficiency: 93, category: 'Realtime' },
    { name: 'RxJS Streams', proficiency: 92, category: 'Architecture' },
    { name: 'Signal Forms & Store', proficiency: 92, category: 'Frontend' },
  ];

  const getBarGradient = (proficiency: number) => {
    if (proficiency >= 94) {
      return 'bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-300';
    }
    if (proficiency >= 90) {
      return 'bg-gradient-to-r from-indigo-500 to-sky-400';
    }
    return 'bg-gradient-to-r from-indigo-600 to-indigo-400';
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-800/80 relative bg-tech-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              <span>Technical Competencies</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Animated Proficiency Metrics</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Skill Proficiency &amp; Architecture Matrix
            </h2>
            <p className="text-slate-400 mt-2 text-base">
              Comprehensive breakdown of frontend mastery, Web3 protocols, reactive state management, and enterprise toolchains measured from commercial production deployments.
            </p>
          </div>

          {/* Interactive View Mode Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto shrink-0 shadow-lg">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'bars'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Animated Bars</span>
            </button>
            <button
              onClick={() => setViewMode('charts')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'charts'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Radar &amp; Charts</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs with horizontal touch scroll for mobile */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSelectedSlug('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center ${
                selectedSlug === 'all'
                  ? 'bg-slate-800 text-white border-indigo-500/80 shadow-sm'
                  : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              All Domains ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = selectedSlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedSlug(cat.slug)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-800 text-white border-indigo-500/80 shadow-sm'
                      : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {categoryIcons[cat.slug]}
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================== VIEW 1: ANIMATED PROFICIENCY BARS ===================== */}
        {viewMode === 'bars' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {filteredCategories.map((category, catIdx) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl hover:border-slate-700/80 transition-all"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      {categoryIcons[category.slug]}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Skill Rows */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="space-y-1.5 group"
                    >
                      {/* Top Label Row */}
                      <div className="flex items-baseline justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          {skill.years && (
                            <span className="text-[11px] text-slate-500 font-mono">
                              ({skill.years})
                            </span>
                          )}
                        </div>

                        {/* Unboxed Metadata with Tabular Numerals */}
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-slate-400 font-sans">{skill.level}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-indigo-400 font-bold tabular-nums">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      {/* Animated Progress Track */}
                      <div className="relative w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{
                            duration: 1.1,
                            delay: skillIdx * 0.12,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`h-full rounded-full ${getBarGradient(skill.proficiency)} shadow-sm relative`}
                        >
                          {/* Subtle leading shine particle on bar */}
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full blur-[1px]" />
                        </motion.div>
                      </div>

                      {/* Real Commercial Context Note */}
                      {skill.contextNote && (
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors pl-0.5 pt-0.5 leading-normal">
                          {skill.contextNote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ===================== VIEW 2: RECHARTS RADAR & COMPARATIVE CHARTS ===================== */}
        {viewMode === 'charts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Radar Chart: Architectural Domains */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <RadarIcon className="w-4 h-4 text-indigo-400" />
                    <span>Domain Mastery Radar</span>
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Multi-axis architectural competency balance
                  </div>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Full Stack Frontend
                </div>
              </div>

              {/* Mobile-responsive Radar Container */}
              <div className="w-full h-80 sm:h-96 -ml-2 sm:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILL_RADAR_DATA}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis
                      dataKey="domain"
                      tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: '#64748b', fontSize: 10 }}
                      stroke="#334155"
                    />
                    <Radar
                      name="Proficiency"
                      dataKey="proficiency"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.4}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                              <div className="text-white font-semibold">{data.domain}</div>
                              <div className="text-indigo-400 font-bold mt-1">
                                Score: {data.proficiency}%
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 leading-relaxed">
                Highlights balanced mastery between frontend frameworks (Angular 21+ &amp; React), decentralized Web3 protocols, reactive state management (Signals &amp; NgRx), and sub-second performance optimization.
              </div>
            </motion.div>

            {/* Horizontal Comparative Bar Chart: Top Frameworks & Protocols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    <span>Top Engineering Proficiencies</span>
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Highest-volume production stacks across projects
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Scale: 0 - 100%
                </div>
              </div>

              {/* Recharts Bar Chart Container */}
              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topSkillsData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      domain={[70, 100]}
                      tick={{ fill: '#64748b', fontSize: 10 }}
                      stroke="#334155"
                      unit="%"
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={130}
                      tick={{ fill: '#cbd5e1', fontSize: 11 }}
                      stroke="#334155"
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                              <div className="text-white font-semibold">{data.name}</div>
                              <div className="text-indigo-400 font-bold mt-1">
                                Proficiency: {data.proficiency}%
                              </div>
                              <div className="text-slate-400 text-[10px] mt-0.5">
                                Category: {data.category}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="proficiency" radius={[0, 6, 6, 0]}>
                      {topSkillsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index % 2 === 0 ? '#6366f1' : '#38bdf8'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 leading-relaxed">
                Ranked by commercial implementation hours in Firebee Technologies and Supreme Technologies, emphasizing modern Angular 21 Standalone architecture and decentralized Web3 interfaces.
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Quantitative Summary Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2+ Years
            </div>
            <div className="text-xs text-slate-400 mt-1">Commercial Production</div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-indigo-400 tracking-tight">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1">Standalone &amp; Signals</div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-sky-400 tracking-tight">
              &lt;120ms
            </div>
            <div className="text-xs text-slate-400 mt-1">WebSocket Order Latency</div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
              +40%
            </div>
            <div className="text-xs text-slate-400 mt-1">FCP Route Optimization</div>
          </div>
        </div>
      </div>
    </section>
  );
};
