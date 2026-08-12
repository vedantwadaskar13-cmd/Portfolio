import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const EducationCredentials: React.FC = () => {
  return (
    <section id="education" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-hud border border-cyan-500/30 font-mono text-xs text-cyan-400 tracking-widest uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMICS & CREDENTIALS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            EDUCATION & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">CERTIFICATIONS</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-mono">
            Mechanical Engineering degree curriculum combined with verified professional machine learning & AI certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC DEGREES</span>
            </div>

            {RESUME_DATA.education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl glass-hud border border-cyan-500/30 glass-hud-hover hud-corner-box space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display font-bold text-xl text-white">{edu.degree}</h3>
                  <span className="px-3 py-1 rounded-full font-mono text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {edu.period}
                  </span>
                </div>

                <div className="font-mono text-sm text-cyan-400 font-medium">{edu.institution}</div>

                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{edu.location}</span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm pt-2 border-t border-slate-800">
                  {edu.field}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>

            {RESUME_DATA.certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl glass-hud border border-emerald-500/30 glass-hud-hover space-y-3 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-lg text-white">{cert.title}</h4>
                  <div className="font-mono text-xs text-emerald-400 font-semibold">{cert.issuer}</div>
                  <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Resume Summary Telemetry Box */}
            <div className="p-6 rounded-2xl glass-hud border border-purple-500/30 bg-purple-950/20 text-slate-300 font-mono text-xs space-y-2">
              <span className="text-purple-300 font-semibold uppercase">// VERIFICATION_LOG</span>
              <p className="leading-relaxed">
                All credentials verified via official course completion records and institutional enrollment at PVG College of Engineering, Pune.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
