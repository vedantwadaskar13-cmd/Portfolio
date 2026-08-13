import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceTelemetry: React.FC = () => {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="relative py-28 overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-hud border border-cyan-500/30 font-mono text-xs text-cyan-400 tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER_PROGRESSION // TELEMETRY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            WORK EXPERIENCE <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">& INTERNSHIPS</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-mono">
            Practical AI/ML model development, machine learning algorithms, and autonomous field robotics engineering.
          </p>
        </div>

        {/* Telemetry Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing HUD Stream Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-400 to-purple-500 opacity-40 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Glowing Telemetry Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_#00f3ff] z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Card Container */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="p-6 sm:p-8 rounded-2xl glass-hud border border-cyan-500/30 hud-corner-box space-y-4">
                      
                      {/* Role & Company Header */}
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                          {exp.type}
                        </div>
                        <h3 className="font-display font-extrabold text-xl text-white mt-1">{exp.role}</h3>
                        <div className="font-mono text-sm text-cyan-400 font-semibold">{exp.company}</div>
                      </div>

                      {/* Period & Location Telemetry */}
                      <div className={`flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Resume Achievements Bullet Points */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-800 text-left">
                        {exp.description.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Used Pills */}
                      <div className={`flex flex-wrap gap-1.5 pt-3 border-t border-slate-800 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        {exp.skillsUsed.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
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
