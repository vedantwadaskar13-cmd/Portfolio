import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface CLITerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  command?: string;
  output: string | React.ReactNode;
  type?: 'cmd' | 'system' | 'error';
}

export const CLITerminalModal: React.FC<CLITerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    {
      output: `VEDANT_AI SYSTEM DIAGNOSTIC CLI v2.7
Type 'help' to view available system commands.`,
      type: 'system',
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // open CLI
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    const newEntries: LogEntry[] = [{ command: inputVal, output: '', type: 'cmd' }];

    switch (trimmed) {
      case 'help':
        newEntries.push({
          output: `AVAILABLE DIAGNOSTIC COMMANDS:
  help       - Show available CLI system commands
  whoami     - Output Vedant Wadaskar summary bio
  skills     - List technical skills & CAD tools
  projects   - Show Safar AI & Vira Chatbot systems
  contact    - Display direct contact channels
  sysinfo    - Output architecture & framework versions
  clear      - Clear terminal history screen
  exit       - Close CLI diagnostic portal`,
          type: 'system',
        });
        break;

      case 'whoami':
        newEntries.push({
          output: `${RESUME_DATA.personal.name}
Role: ${RESUME_DATA.personal.title}
Status: Mechanical Engineering Student (2027) & AI/ML Engineer
Bio: ${RESUME_DATA.personal.summary}`,
          type: 'system',
        });
        break;

      case 'skills':
        newEntries.push({
          output: `TECHNICAL SKILLS MATRIX:
• Python, C++, SQL
• Machine Learning, LangChain, Mistral LLM, Dialogflow NLU
• Scikit-Learn, TensorFlow, Pandas, NumPy, Matplotlib, Seaborn
• CAD Software: SolidWorks, ANSYS, CATIA
• Full-Stack: React, Node.js, FastAPI, MySQL, SQLite, Leaflet`,
          type: 'system',
        });
        break;

      case 'projects':
        newEntries.push({
          output: `FEATURED LAB PROJECTS:
1. Safar — AI Travel Planning Platform (React, FastAPI, LangChain, Mistral LLM, SQLite)
2. Vira — Food Eatery Chatbot (Dialogflow, FastAPI, MySQL Stored Procedures)
3. Agricultural Bot — Autonomous Field Robotics (SolidWorks & ANSYS Blueprint)`,
          type: 'system',
        });
        break;

      case 'contact':
        newEntries.push({
          output: `CONTACT CHANNELS:
Email: ${RESUME_DATA.personal.email}
Phone: ${RESUME_DATA.personal.phone}
LinkedIn: ${RESUME_DATA.personal.linkedin}
GitHub: ${RESUME_DATA.personal.github}`,
          type: 'system',
        });
        break;

      case 'sysinfo':
        newEntries.push({
          output: `SYSTEM ENVIRONMENT INFO:
OS: Antigravity Cyberpunk HUD Node
Framework: React 18 + Vite 5 + TypeScript + Three.js
UI Engine: Tailwind CSS + Framer Motion 11
Database: Firebase Auth + Cloud Firestore
Status: OPERATIONAL [100% HEALTH]`,
          type: 'system',
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newEntries.push({
          output: `Command not recognized: '${trimmed}'. Type 'help' for options.`,
          type: 'error',
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInputVal('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-950 border border-emerald-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,255,157,0.2)] overflow-hidden z-10 font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 text-xs text-emerald-400">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4" />
              <span>VEDANT_AI_CLI // TERMINAL</span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Output Screen */}
          <div className="p-6 h-[400px] overflow-y-auto space-y-4 text-xs bg-black/80 text-emerald-400">
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                {entry.command && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-cyan-400">vedant@ai-lab:~$</span>
                    <span>{entry.command}</span>
                  </div>
                )}
                {entry.output && (
                  <pre className={`whitespace-pre-wrap ${entry.type === 'error' ? 'text-red-400' : 'text-emerald-300/90'}`}>
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Command Input Form */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs">
            <span className="text-cyan-400 font-bold">vedant@ai-lab:~$</span>
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="type a command (e.g. 'help', 'whoami', 'skills')..."
              className="flex-1 bg-transparent text-emerald-300 focus:outline-none placeholder-slate-600"
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
