import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsConstellation: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; level: string; tags: string[]; category: string } | null>(null);

  const categories = ['ALL', ...skills.map(s => s.category)];

  const allSkillsList = skills.flatMap(cat =>
    cat.skills.map(skill => ({
      ...skill,
      category: cat.category,
    }))
  );

  const filteredSkills = allSkillsList.filter(skill => {
    const matchesCategory = activeCategory === 'ALL' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-hud border border-cyan-500/30 font-mono text-xs text-cyan-400 tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>NEURAL_CAPABILITIES // MATRIX</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            SKILLS & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">TECHNOLOGY CONSTELLATION</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-mono">
            Technical competencies extracted strictly from verified experience and CAD engineering domain expertise.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl glass-hud border border-cyan-500/20">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat === 'ALL' ? 'ALL_MODULES' : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tech stack..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-5 rounded-2xl glass-hud border transition-all cursor-pointer interactive-hover ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-neon-cyan'
                      : 'border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="font-display font-bold text-base text-white">{skill.name}</div>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase font-semibold ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : skill.level === 'Advanced'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] text-slate-400 mb-3">{skill.category}</div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Selected Skill Details Modal Banner */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl glass-hud border border-cyan-400/50 bg-cyan-950/20 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-xl text-white">{selectedSkill.name}</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {selectedSkill.level} Competency
                </span>
              </div>
              <p className="text-slate-300 text-xs font-mono">
                Category: <span className="text-cyan-400">{selectedSkill.category}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs hover:text-white"
            >
              CLOSE_TELEMETRY
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
