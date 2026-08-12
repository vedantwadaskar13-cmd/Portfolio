import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles, MapPin, Mail, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { Hero3DCanvas } from '../components/Hero3DCanvas';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenCLI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenCLI }) => {
  const { name, title, tagline, location, email, github, linkedin } = RESUME_DATA.personal;

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* HUD Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-hud border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-[0_0_15px_rgba(0,243,255,0.2)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase font-semibold">AI/ML ENGINEER & DATA ANALYST</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-mono">B.E. 2027</span>
            </div>

            {/* Name Title */}
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
                <span className="block text-slate-100">{name.split(' ')[0]}</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 glow-text-cyan">
                  {name.split(' ')[1]}
                </span>
              </h1>
              <p className="font-mono text-cyan-400/90 text-sm sm:text-base tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{title}</span>
              </p>
            </div>

            {/* Tagline Bio Summary */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
              Building machine learning models, conversational AI agents, and full-stack data-driven applications. Combining mechanical engineering fundamentals with advanced AI/ML models & SQL analytics.
            </p>

            {/* Quick Resume Metadata Telemetry */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full sm:w-auto font-mono text-xs pt-2">
              <div className="p-3.5 px-5 rounded-xl glass-hud border border-cyan-500/20 flex flex-col">
                <span className="text-slate-500 text-[10px]">LOCATION</span>
                <span className="text-slate-200 font-medium flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pune, India</span>
                </span>
              </div>
              <div className="p-3.5 px-5 rounded-xl glass-hud border border-cyan-500/20 flex flex-col">
                <span className="text-slate-500 text-[10px]">STATUS</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open To Roles</span>
                </span>
              </div>
            </div>

            {/* Hero Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-mono font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.7)] hover:scale-[1.02] transition-all interactive-hover"
              >
                <span>EXPLORE PROJECTS LAB</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl glass-hud border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all interactive-hover"
              >
                <span>VIEW RESUME</span>
              </button>

              <button
                onClick={onOpenCLI}
                className="p-3.5 rounded-xl glass-hud border border-purple-500/40 text-purple-400 hover:text-white hover:border-purple-400 hover:shadow-neon-purple transition-all"
                title="Launch Diagnostic CLI Terminal"
              >
                <Terminal className="w-5 h-5" />
              </button>
            </div>

            {/* Social Connectivity Links */}
            <div className="flex items-center gap-4 pt-4 text-slate-400 text-sm">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">CONNECT:</span>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg glass-hud hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg glass-hud hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-lg glass-hud hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Hero 3D Mechanical Neural Canvas Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <Hero3DCanvas />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
