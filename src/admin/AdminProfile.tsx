import React, { useState } from 'react';
import { User, Save, CheckCircle2, Mail, Sparkles, FileText, Upload, Link, Key, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getAdminCreds, ADMIN_CREDS_KEY } from './AdminLogin';

export const AdminProfile: React.FC = () => {
  const { personal, updatePersonal } = usePortfolio();
  const [formData, setFormData] = useState(personal);
  const [adminCreds, setAdminCreds] = useState(getAdminCreds());
  const [saved, setSaved] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData(prev => ({ ...prev, resumeUrl: dataUrl }));
      setUploadStatus(`Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(formData);
    // Save updated admin login credentials
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(adminCreds));

    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between font-mono">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">PROFILE & SECURITY CMS MANAGER</h2>
          <p className="text-xs text-slate-400">Update personal details, contact channels, resume files, and your Admin password.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>PROFILE & SECURITY CREDENTIALS SAVED LIVE! ADMIN PORTAL UPDATED.</span>
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
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PRIMARY TITLE:</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">SUBTITLE / TAGLINE:</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
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
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PHONE NUMBER:</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">EMAIL ADDRESS:</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">LINKEDIN URL:</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">GITHUB REPOSITORY URL:</label>
              <input
                type="text"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
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
              rows={4}
              required
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed resize-y font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">ACADEMIC ALIGNMENT SUMMARY:</label>
            <textarea
              rows={2}
              value={formData.academicFocus}
              onChange={e => setFormData({ ...formData, academicFocus: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed resize-y font-sans text-xs"
            />
          </div>
        </div>

        {/* Section 4: Resume File & Document Settings */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-bold text-purple-300 border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>[04] RESUME FILE & UPLOAD SETTINGS</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-1">UPLOAD NEW RESUME PDF FILE:</label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-dashed border-cyan-500/40">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-file-input"
                />
                <label
                  htmlFor="resume-file-input"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 cursor-pointer font-bold flex items-center gap-2 hover:bg-cyan-500/30 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>CHOOSE PDF / RESUME FILE</span>
                </label>
                <span className="text-slate-400 text-xs">
                  {uploadStatus || (formData.resumeUrl ? 'Custom resume file loaded' : 'No file chosen (default auto-generated resume active)')}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">OR ENTER RESUME FILE URL (Google Drive / Firebase / Cloudinary):</label>
              <div className="relative">
                <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="https://drive.google.com/... or https://example.com/resume.pdf"
                  value={formData.resumeUrl || ''}
                  onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Security & Admin Login Password */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-bold text-purple-300 border-b border-slate-800 pb-2 text-sm flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>[05] ADMIN LOGIN & PASSWORD SECURITY</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">AUTHORIZED ADMIN EMAIL / ID:</label>
              <input
                type="email"
                required
                value={adminCreds.email}
                onChange={e => setAdminCreds({ ...adminCreds, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">AUTHORIZED ADMIN PASSWORD:</label>
              <input
                type="text"
                required
                value={adminCreds.password}
                onChange={e => setAdminCreds({ ...adminCreds, password: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-neon-purple hover:scale-[1.02] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROFILE & SECURITY SETTINGS</span>
          </button>
        </div>

      </form>
    </div>
  );
};
