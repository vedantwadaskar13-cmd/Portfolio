import React, { useState, useEffect } from 'react';
import { Mail, FolderGit2, Briefcase, Cpu, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { fetchContactMessages } from '../services/firebase';

export const AdminDashboard: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Read saved messages from Cloud Database / Firestore / localStorage
    fetchContactMessages().then(msgs => {
      setMessages(msgs);
    });
  }, []);

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <div className="p-6 rounded-2xl glass-hud border border-cyan-500/30 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase">ACTIVE PROJECTS</div>
            <div className="font-display font-bold text-3xl text-white mt-1">{RESUME_DATA.projects.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-hud border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase">WORK HISTORY</div>
            <div className="font-display font-bold text-3xl text-white mt-1">{RESUME_DATA.experience.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-hud border border-purple-500/30 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase">SKILL MODULES</div>
            <div className="font-display font-bold text-3xl text-white mt-1">
              {RESUME_DATA.skills.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-hud border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs uppercase">INBOX TRANSMISSIONS</div>
            <div className="font-display font-bold text-3xl text-white mt-1">{messages.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Messages Inbox */}
      <div className="p-6 sm:p-8 rounded-2xl glass-hud border border-slate-800 space-y-6">
        <div className="flex items-center justify-between font-mono">
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>TRANSMISSIONS INBOX</span>
          </h3>
          <span className="text-xs text-slate-400">{messages.length} Received</span>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-xl">
            No transmissions received yet. Test the contact terminal on the public website to see messages appear here!
          </div>
        ) : (
          <div className="space-y-4 font-mono text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-sm">{msg.name}</span>
                    <span className="text-cyan-400">{msg.email}</span>
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    Received: {new Date(msg.timestamp).toLocaleString()}
                  </div>
                  <p className="text-slate-300 font-sans text-xs pt-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/40 transition-colors shrink-0"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
