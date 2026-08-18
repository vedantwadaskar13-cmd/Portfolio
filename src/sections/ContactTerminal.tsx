import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { sendContactMessage } from '../services/firebase';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export const ContactTerminal: React.FC = () => {
  const { personal } = usePortfolio();
  const { name, email, phone, location, linkedin, github } = personal;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');
  const ref = useReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('SENDING');
    await sendContactMessage({ name: form.name, email: form.email, message: `${form.subject ? '[' + form.subject + '] ' : ''}${form.message}` });
    setStatus('SENT');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('IDLE'), 4000);
  };

  return (
    <section id="contact" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Big "Let's Work Together" heading */}
      <div
        ref={ref}
        className="reveal"
        style={{
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(60px, 8vw, 100px) var(--pad-x)',
          textAlign: 'center',
        }}
      >
        <div className="section-tag" style={{ justifyContent: 'center' }}>
          Get in Touch
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(48px, 9vw, 120px)',
            lineHeight: '0.95',
            letterSpacing: '-0.04em',
            color: 'var(--text-h)',
            marginBottom: '24px',
          }}
        >
          LET'S WORK<br />
          <span style={{ color: 'var(--accent)' }}>TOGETHER</span>
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--text-b)', maxWidth: '480px', margin: '0 auto 32px' }}>
          Open to full-time roles, freelance projects, and interesting collaborations.
        </p>
        <a
          href={`mailto:${email}`}
          style={{
            fontSize: 'clamp(18px, 2.5vw, 28px)',
            fontWeight: 700,
            color: 'var(--text-h)',
            textDecoration: 'none',
            borderBottom: '2px solid var(--accent)',
            paddingBottom: '4px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-h)')}
        >
          {email || 'vedantwadaskar13@gmail.com'}
        </a>
      </div>

      {/* Contact grid: info + form */}
      <div
        className="container-agency"
        style={{
          paddingBlock: 'clamp(60px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
        }}
      >
        {/* Left: contact info */}
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: 'clamp(24px, 2.5vw, 32px)',
              color: 'var(--text-h)',
              marginBottom: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            Contact Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {[
              { Icon: Mail,   label: 'Email',    value: email || 'vedantwadaskar13@gmail.com',  href: `mailto:${email}` },
              { Icon: Phone,  label: 'Phone',    value: phone || '+91 7057174952',               href: `tel:${phone}` },
              { Icon: MapPin, label: 'Location', value: location || 'Pune, Maharashtra, India', href: undefined },
            ].map(({ Icon, label, value, href }) => {
              const inner = (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-h)', fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href} style={{ textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.querySelector('div')!.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.querySelector('div')!.style.color = '')}
                >{inner}</a>
              ) : <div key={label}>{inner}</div>;
            })}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', marginBottom: '28px' }} />

          {/* Social row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { Icon: Github, href: github || '#', label: 'GitHub' },
              { Icon: Linkedin, href: linkedin || '#', label: 'LinkedIn' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '999px',
                  border: '1px solid var(--border)',
                  color: 'var(--text-b)',
                  textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-b)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: contact form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Name
              </label>
              <input className="agency-input" type="text" placeholder="John Doe" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Email
              </label>
              <input className="agency-input" type="email" placeholder="john@example.com" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Subject
            </label>
            <input className="agency-input" type="text" placeholder="Project Inquiry"
              value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Message
            </label>
            <textarea className="agency-input" rows={5} placeholder="Tell me about your project..." required
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ resize: 'none' }}
            />
          </div>
          <button type="submit" disabled={status === 'SENDING'} className="neon-btn"
            style={{ alignSelf: 'flex-start', minWidth: '160px', justifyContent: 'center' }}>
            {status === 'IDLE'    && <><Send size={15} /> Send Message</>}
            {status === 'SENDING' && <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>}
            {status === 'SENT'    && <><CheckCircle size={15} /> Sent!</>}
          </button>
        </form>
      </div>

      {/* Footer bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '20px var(--pad-x)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} {name || 'Vedant Wadaskar'}. All rights reserved.
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="outline-btn"
          style={{ padding: '8px 18px', fontSize: '12px' }}
        >
          Back to Top ↑
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
