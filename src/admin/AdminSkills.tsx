import React, { useState } from 'react';
import { Cpu, Plus, Trash2, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory } from '../data/resumeData';

export const AdminSkills: React.FC = () => {
  const { skills, saveSkills } = usePortfolio();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState(skills[0]?.category || 'ML & Artificial Intelligence');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Expert' | 'Advanced' | 'Intermediate'>('Advanced');
  const [newSkillTags, setNewSkillTags] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const tagsArr = newSkillTags.split(',').map(t => t.trim()).filter(Boolean);

    const updated = skills.map(cat => {
      if (cat.category === newCategory) {
        return {
          ...cat,
          skills: [...cat.skills, { name: newSkillName, level: newSkillLevel, tags: tagsArr }]
        };
      }
      return cat;
    });

    saveSkills(updated);
    setNewSkillName('');
    setNewSkillTags('');
    setIsAdding(false);
  };

  const handleDeleteSkill = (catName: string, skillName: string) => {
    const updated = skills.map(cat => {
      if (cat.category === catName) {
        return {
          ...cat,
          skills: cat.skills.filter(s => s.name !== skillName)
        };
      }
      return cat;
    });
    saveSkills(updated);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between font-mono">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">SKILLS MATRIX CMS</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove technical skills & tools.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-mono text-xs flex items-center gap-2 hover:bg-purple-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW SKILL</span>
        </button>
      </div>

      {/* Add New Skill Form */}
      {isAdding && (
        <form onSubmit={handleAddSkill} className="p-6 rounded-2xl glass-hud border border-purple-500/40 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-purple-300">ADD NEW TECHNICAL SKILL</span>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">SKILL NAME:</label>
              <input
                type="text"
                required
                placeholder="e.g. PyTorch / DAX"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">SKILL CATEGORY:</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              >
                {skills.map((c, idx) => (
                  <option key={idx} value={c.category}>{c.category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">COMPETENCY LEVEL:</label>
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              >
                <option value="Expert">Expert</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">TAGS (comma separated):</label>
            <input
              type="text"
              placeholder="Deep Learning, Neural Nets, Vision"
              value={newSkillTags}
              onChange={e => setNewSkillTags(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold"
            >
              SAVE SKILL
            </button>
          </div>
        </form>
      )}

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((cat, idx) => (
          <div key={idx} className="p-6 rounded-2xl glass-hud border border-slate-800 space-y-4">
            <div className="flex items-center justify-between font-mono">
              <h3 className="font-bold text-cyan-400 text-sm">{cat.category}</h3>
              <span className="text-xs text-slate-500">{cat.skills.length} Skills</span>
            </div>

            <div className="space-y-2">
              {cat.skills.map((s, sIdx) => (
                <div key={sIdx} className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div>
                    <span className="text-white font-semibold">{s.name}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {s.tags.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-slate-400">
                          #{t}{tIdx < s.tags.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                        s.level === 'Expert'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : s.level === 'Advanced'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {s.level}
                    </span>
                    <button
                      onClick={() => handleDeleteSkill(cat.category, s.name)}
                      className="p-1 rounded text-red-400 hover:bg-red-950/40"
                      title="Delete skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
