import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, FolderGit2, X } from 'lucide-react';
import { RESUME_DATA, ProjectItem } from '../data/resumeData';

export const AdminProjects: React.FC = () => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(RESUME_DATA.projects);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = (id: string) => {
    setProjectsList(projectsList.filter(p => p.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    if (isCreating) {
      const newProj: ProjectItem = {
        id: 'proj_' + Date.now(),
        title: editingProject.title || 'New Project',
        subtitle: editingProject.subtitle || '',
        category: (editingProject.category as any) || 'AI/ML',
        image: editingProject.image || '/assets/images/safar.jpg',
        techStack: editingProject.techStack || ['Python', 'FastAPI'],
        summary: editingProject.summary || '',
        highlights: editingProject.highlights || ['Built model workflow.'],
        githubUrl: editingProject.githubUrl || 'https://github.com/vedantwadaskar13-cmd',
        liveUrl: '#',
        featured: true,
      };
      setProjectsList([newProj, ...projectsList]);
    } else {
      setProjectsList(
        projectsList.map(p => (p.id === editingProject.id ? ({ ...p, ...editingProject } as ProjectItem) : p))
      );
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between font-mono">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">PROJECTS CMS MANAGER</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove showcase projects.</p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingProject({
              title: '',
              subtitle: '',
              category: 'AI/ML',
              techStack: ['Python'],
              summary: '',
              highlights: ['Feature implementation details.'],
            });
          }}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-mono text-xs flex items-center gap-2 hover:bg-purple-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PROJECT</span>
        </button>
      </div>

      {/* Edit Form Modal */}
      {editingProject && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl glass-hud border border-purple-500/40 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-purple-300">{isCreating ? 'CREATE PROJECT' : 'EDIT PROJECT'}</span>
            <button type="button" onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">PROJECT TITLE:</label>
              <input
                type="text"
                required
                value={editingProject.title || ''}
                onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">SUBTITLE:</label>
              <input
                type="text"
                value={editingProject.subtitle || ''}
                onChange={e => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">SUMMARY:</label>
            <textarea
              rows={3}
              value={editingProject.summary || ''}
              onChange={e => setEditingProject({ ...editingProject, summary: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsList.map(proj => (
          <div key={proj.id} className="p-6 rounded-2xl glass-hud border border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded font-mono text-[10px] bg-cyan-500/20 text-cyan-300">
                  {proj.category}
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-1">{proj.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProject(proj);
                  }}
                  className="p-2 rounded-lg bg-slate-900 text-cyan-400 hover:bg-cyan-500/20"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-xs">{proj.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
