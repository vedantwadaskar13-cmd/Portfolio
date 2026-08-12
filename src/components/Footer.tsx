import React from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800 bg-[#030712] py-12 text-slate-400 font-mono text-xs z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-white tracking-wider text-sm">
              VEDANT WADASKAR
            </div>
            <div className="text-[10px] text-slate-500">
              AI/ML ENGINEER & DATA ANALYST © {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href={RESUME_DATA.personal.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            GITHUB
          </a>
          <a href={RESUME_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            LINKEDIN
          </a>
          <a href={`mailto:${RESUME_DATA.personal.email}`} className="hover:text-cyan-400 transition-colors">
            EMAIL
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-hud border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition-all"
        >
          <span>BACK_TO_TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
