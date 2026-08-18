import React, { useState, useEffect } from 'react';
import { Mail, FolderGit2, Briefcase, Cpu, Trash2, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { fetchContactMessages } from '../services/firebase';

const STAT_CARDS = [
  {
    label: 'Active Projects',
    value: RESUME_DATA.projects.length,
    Icon: FolderGit2,
    color: '#C6F135',
    bg: 'rgba(198,241,53,0.1)',
  },
  {
    label: 'Work History',
    value: RESUME_DATA.experience.length,
    Icon: Briefcase,
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
  },
  {
    label: 'Skill Modules',
    value: RESUME_DATA.skills.reduce((a, c) => a + c.skills.length, 0),
    Icon: Cpu,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    label: 'Inbox Messages',
    value: 0, // will update dynamically
    Icon: Mail,
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
    dynamic: true,
  },
];

export const AdminDashboard: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactMessages().then(msgs => {
      setMessages(msgs);
      setLoading(false);
    });
  }, []);

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const handleUpdateStatus = (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    const updated = messages.map(m => (m.id === id ? { ...m, leadStatus: newStatus } : m));
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
  };

  const handleSaveNote = (id: string) => {
    const updated = messages.map(m => (m.id === id ? { ...m, adminNotes: noteText } : m));
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
    setEditingNoteId(null);
  };

  const startEditNote = (msg: any) => {
    setEditingNoteId(msg.id);
    setNoteText(msg.adminNotes || '');
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '6px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Overview of your portfolio content and incoming messages.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '40px',
      }}>
        {STAT_CARDS.map((card, i) => (
          <div
            key={card.label}
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              padding: '22px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '10px' }}>
                {card.label}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '36px', color: '#fff', lineHeight: 1 }}>
                {card.dynamic ? messages.length : card.value}
              </div>
            </div>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: card.color, flexShrink: 0,
            }}>
              <card.Icon size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Info strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: '#141414', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px', padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <TrendingUp size={16} style={{ color: '#C6F135' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Portfolio Health</span>
          </div>
          {[
            { label: 'Projects', value: RESUME_DATA.projects.length, max: 20, color: '#C6F135' },
            { label: 'Experience', value: RESUME_DATA.experience.length, max: 10, color: '#60a5fa' },
            { label: 'Skills', value: RESUME_DATA.skills.reduce((a, c) => a + c.skills.length, 0), max: 40, color: '#a78bfa' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>{item.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{item.value}</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <div style={{
                  height: '100%', borderRadius: '2px', background: item.color,
                  width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#141414', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px', padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Clock size={16} style={{ color: '#C6F135' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Quick Info</span>
          </div>
          {[
            { label: 'Last Updated', value: 'Just now' },
            { label: 'Certifications', value: RESUME_DATA.certifications?.length || 0 },
            { label: 'Education', value: RESUME_DATA.education?.length || 0 },
            { label: 'Contact Form', value: 'Live & Active' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontSize: '13px', color: '#555' }}>{label}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Inbox */}
      <div style={{
        background: '#141414', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={16} style={{ color: '#C6F135' }} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff' }}>
              Messages Inbox
            </span>
          </div>
          <span style={{
            padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
            background: messages.length > 0 ? 'rgba(198,241,53,0.1)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${messages.length > 0 ? 'rgba(198,241,53,0.3)' : 'rgba(255,255,255,0.08)'}`,
            color: messages.length > 0 ? '#C6F135' : '#555',
          }}>
            {messages.length} received
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: '8px' }}>
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#444', fontSize: '14px' }}>
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div style={{
              padding: '48px', textAlign: 'center', color: '#333',
              border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '14px', margin: '8px',
              fontSize: '13px',
            }}>
              No messages yet — send a test message via the Contact section on the portfolio.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  background: '#0C0C0C', borderRadius: '14px', padding: '18px 20px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  transition: 'border-color 0.2s ease',
                  flexDirection: 'column',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                >
                  <div style={{ display: 'flex', width: '100%', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(198,241,53,0.1)', border: '1px solid rgba(198,241,53,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#C6F135', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px',
                    }}>
                      {msg.name?.[0]?.toUpperCase() || 'M'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{msg.name}</span>
                          <a
                            href={`mailto:${msg.email}`}
                            style={{ fontSize: '13px', color: '#C6F135', textDecoration: 'none' }}
                          >
                            {msg.email}
                          </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* Lead status selector */}
                          <select
                            value={msg.leadStatus || 'New'}
                            onChange={e => handleUpdateStatus(msg.id, e.target.value as any)}
                            style={{
                              background: msg.leadStatus === 'Closed' ? 'rgba(255,255,255,0.06)' : msg.leadStatus === 'Contacted' ? 'rgba(96,165,250,0.15)' : 'rgba(198,241,53,0.15)',
                              border: `1px solid ${msg.leadStatus === 'Closed' ? 'rgba(255,255,255,0.15)' : msg.leadStatus === 'Contacted' ? 'rgba(96,165,250,0.4)' : 'rgba(198,241,53,0.4)'}`,
                              color: msg.leadStatus === 'Closed' ? '#888' : msg.leadStatus === 'Contacted' ? '#60a5fa' : '#C6F135',
                              padding: '3px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                              outline: 'none', cursor: 'pointer',
                            }}
                          >
                            <option value="New">● New Lead</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Closed">● Closed</option>
                          </select>

                          <span style={{ fontSize: '11px', color: '#444' }}>
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, wordBreak: 'break-word', marginBottom: '10px' }}>
                        {msg.message}
                      </p>

                      {/* Notes / Internal status view */}
                      {editingNoteId === msg.id ? (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <input
                            type="text"
                            placeholder="Add lead note / follow-up reminder..."
                            value={noteText}
                            onChange={e => setNoteText(e.target.value)}
                            style={{
                              flex: 1, padding: '6px 12px', background: '#141414',
                              border: '1px solid rgba(198,241,53,0.3)', borderRadius: '8px',
                              color: '#fff', fontSize: '12px', outline: 'none',
                            }}
                          />
                          <button
                            onClick={() => handleSaveNote(msg.id)}
                            style={{
                              padding: '6px 14px', background: '#C6F135', color: '#0C0C0C',
                              border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            Save Note
                          </button>
                          <button
                            onClick={() => setEditingNoteId(null)}
                            style={{
                              padding: '6px 10px', background: 'transparent', color: '#888',
                              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                          {msg.adminNotes ? (
                            <div style={{
                              fontSize: '11px', color: '#C6F135', background: 'rgba(198,241,53,0.06)',
                              padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(198,241,53,0.2)',
                            }}>
                              Note: {msg.adminNotes}
                            </div>
                          ) : null}
                          <button
                            onClick={() => startEditNote(msg)}
                            style={{
                              background: 'none', border: 'none', color: '#555',
                              fontSize: '11px', cursor: 'pointer', textDecoration: 'underline',
                              padding: 0,
                            }}
                          >
                            {msg.adminNotes ? 'Edit note' : '+ Add follow-up note'}
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const updated = messages.filter(m => m.id !== msg.id);
                        setMessages(updated);
                        localStorage.setItem('contact_messages', JSON.stringify(updated));
                      }}
                      title="Delete message"
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.18)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
