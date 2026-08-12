import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Lock, Menu, X, Cpu, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCLI: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenCLI, onOpenAdmin }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'SYSTEM' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS_MATRIX' },
    { id: 'projects', label: 'PROJECTS_LAB' },
    { id: 'experience', label: 'TELEMETRY' },
    { id: 'education', label: 'CREDENTIALS' },
    { id: 'contact', label: 'TRANSMISSION' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-3 bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-neon-cyan' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Telemetry Tag */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all">
            <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              VEDANT<span className="text-cyan-400">.AI</span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SYS_ONLINE v2.7</span>
            </div>
          </div>
        </button>

        {/* Desktop HUD Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-hud px-4 py-1.5 rounded-full border border-cyan-500/30">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-lg bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls: Resume, CLI Terminal, Admin */}
        <div className="hidden sm:flex items-center gap-3">
          {/* CLI Terminal Shortcut Button */}
          <button
            onClick={onOpenCLI}
            title="Open Diagnostic CLI Terminal (/)"
            className="p-2.5 rounded-xl glass-hud border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 hover:shadow-neon-cyan transition-all interactive-hover"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-medium hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-neon-cyan transition-all interactive-hover"
          >
            <FileText className="w-4 h-4" />
            <span>RESUME</span>
          </button>

          {/* Admin Control Center Portal Button */}
          <button
            onClick={onOpenAdmin}
            title="Protected Admin Portal (/admin)"
            className="p-2.5 rounded-xl glass-hud border border-purple-500/30 text-purple-400 hover:text-white hover:border-purple-400 hover:shadow-neon-purple transition-all interactive-hover"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl glass-hud border border-cyan-500/30 text-cyan-400"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/30 px-6 py-6"
          >
            <div className="flex flex-col gap-3 font-mono text-sm">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left px-4 py-2.5 rounded-xl transition-all ${
                    activeSection === link.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-xs font-semibold"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW RESUME</span>
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenCLI(); }}
                  className="p-3 rounded-xl glass-hud border border-cyan-500/40 text-cyan-400"
                >
                  <Terminal className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="p-3 rounded-xl glass-hud border border-purple-500/40 text-purple-400"
                >
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
