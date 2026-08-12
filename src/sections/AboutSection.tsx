import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Database, Wrench, Award, Compass, Code, Layers } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const AboutSection: React.FC = () => {
  const { summary, academicFocus } = RESUME_DATA.personal;

  const coreFocusAreas = [
    {
      icon: Brain,
      title: 'AI/ML & Generative AI',
      desc: 'Building classification algorithms, recommendation clustering, NLP webhooks with Dialogflow, and multi-tool LLM agents (LangChain & Mistral AI).',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      icon: Database,
      title: 'Data Analytics & SQL',
      desc: 'Exploratory Data Analysis (EDA) using Pandas, NumPy, Matplotlib & Seaborn, combined with SQL stored procedures and Power BI dashboards.',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      icon: Wrench,
      title: 'Mechanical Engineering & CAD',
      desc: 'B.E. Mechanical (2027 passout) with hands-on CAD modeling & simulation skills in SolidWorks, ANSYS, and CATIA applied to autonomous field robotics.',
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    },
    {
      icon: Code,
      title: 'Full-Stack Integration',
      desc: 'Developing end-to-end applications connecting React user interfaces with Python/FastAPI microservices, Node.js, SQLite, and MySQL databases.',
      color: 'text-amber-400',
      border: 'border-amber-500/30'
    }
  ];

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-hud border border-cyan-500/30 font-mono text-xs text-cyan-400 tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE_PROFILE // TELEMETRY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            ENGINEERING x <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">AI PARADIGM</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" />
        </div>

        {/* Top Split Layout: Professional Bio & Fact Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-14">
          
          {/* Main Professional Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 p-8 rounded-2xl glass-hud border border-cyan-500/30 hud-corner-box flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs text-cyan-400">
                <span>// SUMMARY_LOG</span>
                <span>SYSTEM_STATUS: ACTIVE</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans">
                {summary}
              </p>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm font-mono leading-normal">
                <span className="text-cyan-400 font-semibold">ACADEMIC ALIGNMENT: </span>
                {academicFocus}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap gap-4 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Python / C++ / SQL</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> LangChain / Mistral AI</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> SolidWorks / ANSYS</span>
            </div>
          </motion.div>

          {/* Resume Metric Counter Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            <div className="p-6 rounded-2xl glass-hud border border-cyan-500/30 flex items-center gap-5">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <div className="font-display font-extrabold text-3xl text-white">02</div>
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">Major AI Systems Built</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-hud border border-emerald-500/30 flex items-center gap-5">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="font-display font-extrabold text-3xl text-white">02</div>
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">IBM & Tata Certifications</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-hud border border-purple-500/30 flex items-center gap-5">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-400/30 text-purple-400">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <div className="font-display font-extrabold text-3xl text-white">2027</div>
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">B.E. Mechanical Passout</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFocusAreas.map((area, idx) => {
            const IconComp = area.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl glass-hud border ${area.border} glass-hud-hover flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className={`p-3 rounded-xl bg-slate-900/80 w-fit ${area.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{area.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{area.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
