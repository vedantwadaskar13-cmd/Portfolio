import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Sparkles, CheckCircle2, Terminal } from 'lucide-react';
import { ProjectItem } from '../data/resumeData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/90 backdrop-blur-xl"
        />

        {/* HUD Popup Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.25)] overflow-hidden z-10 my-8 hud-corner-box"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60 font-mono text-xs text-cyan-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>PROJECT_TELEMETRY // {project.id.toUpperCase()}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
            {/* Image Preview Banner */}
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-cyan-500/30">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="px-3 py-1 rounded-full font-mono text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {project.category}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2 hover:bg-cyan-500/20 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>CODE_REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Subtitle & Summary */}
            <div className="space-y-3">
              <h4 className="font-mono text-sm text-cyan-400">{project.subtitle}</h4>
              <p className="text-slate-300 text-base leading-relaxed">{project.summary}</p>
            </div>

            {/* Resume Verified Technical Highlights */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>KEY IMPLEMENTATION HIGHLIGHTS (RESUME VERIFIED)</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>TECHNOLOGY ARCHITECTURE</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-medium shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
