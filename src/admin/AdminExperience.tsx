import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceItem } from '../data/resumeData';

export const AdminExperience: React.FC = () => {
  const { experience, saveExperience } = usePortfolio();
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = (id: string) => {
    const updated = experience.filter(e => e.id !== id);
    saveExperience(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.role || !editingExp?.company) return;

    let updatedList: ExperienceItem[];

    if (isCreating) {
      const newExp: ExperienceItem = {
        id: 'exp_' + Date.now(),
        role: editingExp.role || 'Engine Role',
        company: editingExp.company || 'Company Name',
        location: editingExp.location || 'Pune, India',
        period: editingExp.period || '2026 – Present',
        type: (editingExp.type as any) || 'Full-time',
        description: typeof editingExp.description === 'string' 
          ? (editingExp.description as string).split('\n').filter(Boolean)
          : editingExp.description || ['Delivered key technical solutions.'],
        skillsUsed: typeof editingExp.skillsUsed === 'string'
          ? (editingExp.skillsUsed as string).split(',').map(s => s.trim()).filter(Boolean)
          : editingExp.skillsUsed || ['Python', 'AI/ML']
      };
      updatedList = [newExp, ...experience];
    } else {
      updatedList = experience.map(item => {
        if (item.id === editingExp.id) {
          return {
            ...item,
            ...editingExp,
            description: typeof editingExp.description === 'string'
              ? (editingExp.description as string).split('\n').filter(Boolean)
              : editingExp.description || item.description,
            skillsUsed: typeof editingExp.skillsUsed === 'string'
              ? (editingExp.skillsUsed as string).split(',').map(s => s.trim()).filter(Boolean)
              : editingExp.skillsUsed || item.skillsUsed
          } as ExperienceItem;
        }
        return item;
      });
    }

    saveExperience(updatedList);
    setEditingExp(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between font-mono">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">WORK EXPERIENCE CMS</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove career telemetry records.</p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingExp({
              role: '',
              company: '',
              location: 'Pune, India',
              period: '2026 – Present',
              type: 'Full-time',
              description: ['Collaborated on technical workflows.'],
              skillsUsed: ['Python', 'Machine Learning']
            });
          }}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-mono text-xs flex items-center gap-2 hover:bg-purple-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW EXPERIENCE</span>
        </button>
      </div>

      {/* Edit / Create Form */}
      {editingExp && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl glass-hud border border-purple-500/40 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-purple-300">{isCreating ? 'ADD NEW EXPERIENCE' : 'EDIT EXPERIENCE'}</span>
            <button type="button" onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">JOB ROLE / TITLE:</label>
              <input
                type="text"
                required
                placeholder="AI/ML Engineer"
                value={editingExp.role || ''}
                onChange={e => setEditingExp({ ...editingExp, role: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">COMPANY NAME:</label>
              <input
                type="text"
                required
                placeholder="Shamgar Software Solutions"
                value={editingExp.company || ''}
                onChange={e => setEditingExp({ ...editingExp, company: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">LOCATION:</label>
              <input
                type="text"
                value={editingExp.location || ''}
                onChange={e => setEditingExp({ ...editingExp, location: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">PERIOD:</label>
              <input
                type="text"
                value={editingExp.period || ''}
                onChange={e => setEditingExp({ ...editingExp, period: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">TYPE:</label>
            <select
              value={editingExp.type || 'Full-time'}
              onChange={e => setEditingExp({ ...editingExp, type: e.target.value as any })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
            >
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">DESCRIPTION BULLETS (one per line):</label>
            <textarea
              rows={3}
              value={Array.isArray(editingExp.description) ? editingExp.description.join('\n') : editingExp.description || ''}
              onChange={e => setEditingExp({ ...editingExp, description: e.target.value as any })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">SKILLS USED (comma separated):</label>
            <input
              type="text"
              value={Array.isArray(editingExp.skillsUsed) ? editingExp.skillsUsed.join(', ') : editingExp.skillsUsed || ''}
              onChange={e => setEditingExp({ ...editingExp, skillsUsed: e.target.value as any })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingExp(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold"
            >
              SAVE EXPERIENCE
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp.id} className="p-6 rounded-2xl glass-hud border border-slate-800 flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="font-display font-bold text-lg text-white">{exp.role} — <span className="text-purple-400">{exp.company}</span></div>
              <div className="font-mono text-xs text-cyan-400">{exp.period} | {exp.location} ({exp.type})</div>
              <ul className="list-disc list-inside text-slate-300 text-xs pt-2 space-y-1">
                {exp.description.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1 pt-2">
                {exp.skillsUsed.map((sk, skIdx) => (
                  <span key={skIdx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-emerald-400 border border-slate-800">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pl-4">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingExp(exp);
                }}
                className="p-2 rounded-lg bg-slate-900 text-cyan-400 hover:bg-cyan-500/20"
                title="Edit experience"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/40"
                title="Delete experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
