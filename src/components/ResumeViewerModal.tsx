import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Printer, CheckCircle, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate formatted plain-text resume download file
    const content = `
===================================================================
VEDANT WADASKAR — RESUME
AI/ML Engineer | Machine Learning & Data Analytics
Pune, Maharashtra, India | +91 7057174952 | vedantwadaskar13@gmail.com
LinkedIn: ${RESUME_DATA.personal.linkedin}
GitHub: ${RESUME_DATA.personal.github}
===================================================================

PROFESSIONAL SUMMARY
${RESUME_DATA.personal.summary}

TECHNICAL SKILLS
- Languages & Core: Python, C++, SQL
- ML & AI: Machine Learning, Gen-AI, Chatbot Development, Full-Stack Development, Robotics, LangChain, Mistral AI, Dialogflow
- Data Analysis & BI: EDA, Numpy, Pandas, Matplotlib, Seaborn, Excel, Power BI, Google Sheets
- CAD & Engineering Tools: SolidWorks, ANSYS, CATIA
- Frameworks & Tools: Scikit-Learn, TensorFlow, Jupyter Notebook, GitHub, Node.js, FastAPI, React, SQLite, MySQL, Leaflet, Firebase

EXPERIENCE
1. AI/ML Engineer @ Shamgar Software Solutions (Oct 2025 – Present | Vishakhapatnam, India)
   - Collaborated on AI/ML projects specializing in artificial intelligence and machine learning workflows.
   - Built and evaluated machine learning models across structured datasets.
   - Partnered with engineering team to translate business requirements into working ML solutions.

2. Project Intern @ PVG's Robotics Club (Mar 2025 – Apr 2025 | Pune, India)
   - Completed Mini-Internship Program on an Agricultural Bot applying robotics to farming use cases.
   - Explored robotics & agriculture intersection to improve farming efficiency.

PROJECTS
1. Safar — AI-Powered Travel Planning Platform (React, Node.js, FastAPI, LangChain, Mistral AI, Firebase, SQLite, Leaflet)
   - Full-stack trip planner with LangChain & Mistral LLM for destination clustering and route sequencing.
2. Vira — Food Eatery Chatbot (Python, FastAPI, Dialogflow, MySQL)
   - Conversational ordering chatbot using Dialogflow NLU and FastAPI webhooks connected to MySQL stored procedures.

EDUCATION
1. Bachelor of Engineering (B.E.) in Mechanical Engineering | Pune Vidyarthi Griha's College of Engineering (Aug 2023 – Jun 2027)
2. Higher Secondary Education | New English High School & Junior College (Jul 2021 – May 2023)

CERTIFICATIONS
- Machine Learning with Python — IBM
- GenAI Powered Data Analytics — Tata (Forage)
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vedant_Wadaskar_Resume.txt';
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
              <span>OFFICIAL_RESUME_VIEWER // VEDANT WADASKAR</span>
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
            {/* Document Header */}
            <div className="border-b border-slate-700/80 pb-6 text-center space-y-2">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                VEDANT WADASKAR
              </h1>
              <p className="font-mono text-sm text-cyan-400 font-semibold">
                AI/ML Engineer | Machine Learning & Data Analytics
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-slate-400 pt-2">
                <span>Pune, Maharashtra, India</span>
                <span>•</span>
                <span>+91 7057174952</span>
                <span>•</span>
                <span>vedantwadaskar13@gmail.com</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                {RESUME_DATA.personal.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
                TECHNICAL SKILLS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {RESUME_DATA.skills.map((cat, idx) => (
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
              {RESUME_DATA.experience.map(exp => (
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
              {RESUME_DATA.projects.map(proj => (
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
