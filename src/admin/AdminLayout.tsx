import React from 'react';
import { LogOut, FolderGit2, Briefcase, Cpu, User, ArrowLeft, ShieldCheck, Database } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface AdminLayoutProps {
  user: FirebaseUser | { email: string } | null;
  activeTab: 'dashboard' | 'profile' | 'projects' | 'experience' | 'skills';
  onTabChange: (tab: 'dashboard' | 'profile' | 'projects' | 'experience' | 'skills') => void;
  onExit: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  user,
  activeTab,
  onTabChange,
  onExit,
  onLogout,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PROTECTED ADMIN CONTROL</span>
            </div>
            <h1 className="font-display font-extrabold text-xl text-white">PORTFOLIO CMS</h1>
            <div className="font-mono text-xs text-slate-400 truncate">
              {user?.email || 'admin@vedant.ai'}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 font-mono text-xs">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Dashboard & Messages</span>
            </button>

            <button
              onClick={() => onTabChange('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & About Section</span>
            </button>

            <button
              onClick={() => onTabChange('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'projects'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects Manager</span>
            </button>

            <button
              onClick={() => onTabChange('experience')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'experience'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience Manager</span>
            </button>

            <button
              onClick={() => onTabChange('skills')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'skills'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Skills Matrix</span>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 font-mono text-xs">
          <button
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Web</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
