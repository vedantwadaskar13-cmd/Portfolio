import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Printer } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { RESUME_DATA } from '../data/resumeData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const { personal, projects, experience, skills } = usePortfolio();

  if (!isOpen) return null;

  const handleDownload = () => {
    // If user uploaded or set a custom resume URL in Admin, download/open that file directly!
    if (personal.resumeUrl) {
      const link = document.createElement('a');
      link.href = personal.resumeUrl;
      link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Otherwise generate formatted plaintext resume document download
    const content = personal.customResumeText || `
===================================================================
${personal.name.toUpperCase()} — RESUME
${personal.title}
${personal.location} | ${personal.phone} | ${personal.email}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}
===================================================================

PROFESSIONAL SUMMARY
${personal.summary}

TECHNICAL SKILLS
${skills.map(s => `- ${s.category}: ${s.skills.map(sk => sk.name).join(', ')}`).join('\n')}

EXPERIENCE
${experience.map((e, idx) => `${idx + 1}. ${e.role} @ ${e.company} (${e.period} | ${e.location})\n   - ${e.description.join('\n   - ')}`).join('\n\n')}

PROJECTS
${projects.map((p, idx) => `${idx + 1}. ${p.title} (${p.techStack.join(', ')})\n   - ${p.highlights.join('\n   - ')}`).join('\n\n')}

EDUCATION
${RESUME_DATA.education.map(edu => `- ${edu.degree} | ${edu.institution} (${edu.period})`).join('\n')}

CERTIFICATIONS
${RESUME_DATA.certifications.map(cert => `- ${cert.title} — ${cert.issuer}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.25)] overflow-hidden z-10 my-8 hud-corner-box"
        >
          {/* Header Controls Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400">
              <FileText className="w-4 h-4" />
              <span>OFFICIAL_RESUME_VIEWER // {personal.name.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold flex items-center gap-1.5 hover:shadow-neon-cyan transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Print Document"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resume Preview Document Body */}
          <div className="p-8 sm:p-10 max-h-[80vh] overflow-y-auto bg-slate-900/40 space-y-8 font-sans text-slate-200">
            {personal.customResumeText ? (
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 leading-relaxed">
                {personal.customResumeText}
              </pre>
            ) : (
              <>
                {/* Document Header */}
                <div className="border-b border-slate-700/80 pb-6 text-center space-y-2">
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                    {personal.name.toUpperCase()}
                  </h1>
                  <p className="font-mono text-sm text-cyan-400 font-semibold">
                    {personal.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-slate-400 pt-2">
                    <span>{personal.location}</span>
                    <span>•</span>
                    <span>{personal.phone}</span>
                    <span>•</span>
                    <span>{personal.email}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {personal.summary}
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="space-y-3">
                  <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                    TECHNICAL SKILLS
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {skills.map((cat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                        <span className="font-mono font-semibold text-cyan-300 block mb-1">{cat.category}</span>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.map((s, sIdx) => (
                            <span key={sIdx} className="text-slate-400 font-mono">
                              {s.name}{sIdx < cat.skills.length - 1 ? ' • ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                    EXPERIENCE
                  </h2>
                  {experience.map(exp => (
                    <div key={exp.id} className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{exp.role} — <span className="text-cyan-400">{exp.company}</span></span>
                        <span className="font-mono text-slate-400">{exp.period} | {exp.location}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                        {exp.description.map((item, iIdx) => (
                          <li key={iIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="space-y-4">
                  <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                    PROJECTS
                  </h2>
                  {projects.map(proj => (
                    <div key={proj.id} className="space-y-1.5 text-xs">
                      <div className="font-semibold text-white">
                        {proj.title} — <span className="font-mono text-cyan-400 font-normal">{proj.techStack.join(', ')}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                        {proj.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                      EDUCATION
                    </h2>
                    {RESUME_DATA.education.map(edu => (
                      <div key={edu.id} className="text-xs space-y-0.5">
                        <div className="font-semibold text-white">{edu.degree}</div>
                        <div className="text-slate-400">{edu.institution}</div>
                        <div className="font-mono text-[11px] text-cyan-400">{edu.period}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                      CERTIFICATIONS
                    </h2>
                    {RESUME_DATA.certifications.map(cert => (
                      <div key={cert.id} className="text-xs space-y-0.5">
                        <div className="font-semibold text-white">{cert.title}</div>
                        <div className="text-emerald-400 font-mono text-[11px]">{cert.issuer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
