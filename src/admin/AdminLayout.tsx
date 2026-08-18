import React from 'react';
import { LogOut, FolderGit2, Briefcase, Cpu, User, ArrowLeft, ShieldCheck, Database, LayoutDashboard } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface AdminLayoutProps {
  user: FirebaseUser | { email: string } | null;
  activeTab: 'dashboard' | 'profile' | 'projects' | 'experience' | 'skills';
  onTabChange: (tab: 'dashboard' | 'profile' | 'projects' | 'experience' | 'skills') => void;
  onExit: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard & Leads',   Icon: LayoutDashboard },
  { id: 'profile',    label: 'Profile & Hero',       Icon: User },
  { id: 'projects',   label: 'Projects Manager',     Icon: FolderGit2 },
  { id: 'experience', label: 'Experience & Roles',   Icon: Briefcase },
  { id: 'skills',     label: 'Skills & Stack',       Icon: Cpu },
] as const;

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  user, activeTab, onTabChange, onExit, onLogout, children,
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0C0C0C',
      color: '#FFFFFF',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'row',
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: '260px',
        flexShrink: 0,
        background: '#111111',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 20px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div>
          {/* Logo / Brand */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 12px', borderRadius: '999px',
              background: 'rgba(198,241,53,0.1)', border: '1px solid rgba(198,241,53,0.3)',
              marginBottom: '14px',
            }}>
              <ShieldCheck size={12} style={{ color: '#C6F135' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C6F135' }}>
                Admin Portal
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: '#C6F135',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', color: '#0C0C0C',
              }}>
                VW
              </div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', color: '#fff' }}>Portfolio CMS</div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                  {user?.email || 'admin@vedant.dev'}
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '11px 14px', borderRadius: '12px',
                    background: isActive ? 'rgba(198,241,53,0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(198,241,53,0.3)' : '1px solid transparent',
                    color: isActive ? '#C6F135' : '#666',
                    fontSize: '13px', fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#666';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
          <button
            onClick={onExit}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '10px 16px', borderRadius: '12px',
              background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
              color: '#888', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#fff';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = '#888';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <ArrowLeft size={14} /> Return to Portfolio
          </button>
          <button
            onClick={onLogout}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '10px 16px', borderRadius: '12px',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#ef4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
            }}
          >
            <LogOut size={14} /> Logout Session
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{
        flex: 1,
        padding: 'clamp(24px, 4vw, 48px)',
        overflowY: 'auto',
        background: '#0C0C0C',
      }}>
        {children}
      </main>

      {/* Mobile sidebar warning */}
      <style>{`
        @media (max-width: 768px) {
          aside { 
            position: fixed !important; 
            z-index: 50; 
            width: 220px !important;
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};
