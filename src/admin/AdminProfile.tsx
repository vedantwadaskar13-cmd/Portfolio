import React, { useState } from 'react';
import { User, Save, CheckCircle2, MapPin, Mail, Phone, Github, Linkedin, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const AdminProfile: React.FC = () => {
  const [personal, setPersonal] = useState(RESUME_DATA.personal);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update local resume data object
    Object.assign(RESUME_DATA.personal, personal);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between font-mono">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">PROFILE & BIO CMS MANAGER</h2>
          <p className="text-xs text-slate-400">Update personal details, titles, contact channels, summary, and academic focus.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>PROFILE & ABOUT SECTION DETAILS UPDATED SUCCESSFULLY!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-hud border border-purple-500/40 space-y-6 font-mono text-xs">
        
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <h3 className="font-bold text-purple-300 border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>[01] PERSONAL INFORMATION & TITLES</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">FULL NAME:</label>
              <input
                type="text"
                required
                value={personal.name}
                onChange={e => setPersonal({ ...personal, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PRIMARY TITLE:</label>
              <input
                type="text"
                required
                value={personal.title}
                onChange={e => setPersonal({ ...personal, title: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">SUBTITLE / TAGLINE:</label>
              <input
                type="text"
                value={personal.tagline}
                onChange={e => setPersonal({ ...personal, tagline: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Channels */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-bold text-purple-300 border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>[02] CONTACT DETAILS & SOCIAL LINKS</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">LOCATION:</label>
              <input
                type="text"
                value={personal.location}
                onChange={e => setPersonal({ ...personal, location: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PHONE NUMBER:</label>
              <input
                type="text"
                value={personal.phone}
                onChange={e => setPersonal({ ...personal, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">EMAIL ADDRESS:</label>
              <input
                type="email"
                required
                value={personal.email}
                onChange={e => setPersonal({ ...personal, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">LINKEDIN URL:</label>
              <input
                type="text"
                value={personal.linkedin}
                onChange={e => setPersonal({ ...personal, linkedin: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">GITHUB REPOSITORY URL:</label>
              <input
                type="text"
                value={personal.github}
                onChange={e => setPersonal({ ...personal, github: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Professional Summary & About Content */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-bold text-purple-300 border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>[03] ABOUT SECTION & PROFESSIONAL SUMMARY</span>
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">PROFESSIONAL BIO SUMMARY:</label>
            <textarea
              rows={5}
              required
              value={personal.summary}
              onChange={e => setPersonal({ ...personal, summary: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed resize-y font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">ACADEMIC ALIGNMENT SUMMARY:</label>
            <textarea
              rows={3}
              value={personal.academicFocus}
              onChange={e => setPersonal({ ...personal, academicFocus: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed resize-y font-sans text-xs"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-neon-purple hover:scale-[1.02] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROFILE & ABOUT CHANGES</span>
          </button>
        </div>

      </form>
    </div>
  );
};
