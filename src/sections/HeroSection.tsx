import React, { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const { personal } = usePortfolio();
  const { name, title, summary, linkedin, github, email, heroImage } = personal;

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  const scrollToWork = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-h)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Background gradient blob */}
      <div style={{
        position: 'absolute',
        top: '10%', right: '-10%',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,241,53,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0', left: '-5%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,241,53,0.04) 0%, transparent 65%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div
        className="container-agency"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          paddingBlock: 'clamp(60px, 8vh, 100px)',
        }}
      >
        {/* ─── LEFT: Text ─── */}
        <div style={{ maxWidth: '700px' }}>
          {/* Available badge */}
          <div ref={r1} className="reveal" style={{ marginBottom: '28px' }}>
            <div className="section-tag">
              Available for Work
            </div>
          </div>

          {/* Main headline */}
          <div ref={r2} className="reveal reveal-delay-1">
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(42px, 6.8vw, 94px)',
                lineHeight: '1.0',
                letterSpacing: '-0.03em',
                color: 'var(--text-h)',
                marginBottom: '28px',
              }}
            >
              AI/ML ENGINEER
              <br />
              <span style={{ color: 'var(--accent)' }}>&amp; FULL-STACK</span>
              <br />
              DEVELOPER
            </h1>

            {/* Sub description */}
            <p style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: '1.7',
              color: 'var(--text-b)',
              maxWidth: '540px',
              marginBottom: '36px',
            }}>
              {summary?.slice(0, 180) || 'Building intelligent systems — machine learning models, AI agents, and full-stack data-driven applications that translate complex problems into measurable impact.'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <button
                className="neon-btn"
                onClick={scrollToWork}
                style={{ fontSize: '14px' }}
              >
                View My Work ↓
              </button>
              <button
                className="outline-btn"
                onClick={onOpenResume}
              >
                Download CV
              </button>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Connect
              </span>
              <div style={{ width: '32px', height: '1px', background: 'var(--border)' }} />
              {[
                { icon: Github, href: github || '#', label: 'GitHub' },
                { icon: Linkedin, href: linkedin || '#', label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-b)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
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
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Portrait ─── */}
        <div ref={r3} className="reveal reveal-delay-2">
          <div
            style={{
              position: 'relative',
              width: 'clamp(220px, 28vw, 420px)',
              aspectRatio: '3/4',
            }}
          >
            {/* Neon lime accent border */}
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, var(--accent) 0%, transparent 50%, var(--accent-dim) 100%)',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              inset: '2px',
              borderRadius: '22px',
              background: 'var(--bg-card)',
              zIndex: 1,
              overflow: 'hidden',
            }}>
              <img
                src={heroImage || '/assets/images/hero_vedant.jpg'}
                alt={name || 'Vedant Wadaskar'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
            </div>

            {/* Floating badge — top left */}
            <div style={{
              position: 'absolute',
              top: '-16px', left: '-16px',
              zIndex: 10,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '10px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text-h)', lineHeight: 1 }}>2+</div>
              <div style={{ fontSize: '10px', color: 'var(--text-b)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>Years Exp.</div>
            </div>

            {/* Floating badge — bottom right */}
            <div style={{
              position: 'absolute',
              bottom: '-16px', right: '-16px',
              zIndex: 10,
              background: 'var(--accent)',
              borderRadius: '12px',
              padding: '10px 16px',
              boxShadow: '0 8px 24px var(--accent-glow)',
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0C0C0C', lineHeight: 1 }}>15+</div>
              <div style={{ fontSize: '10px', color: 'rgba(12,12,12,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToWork}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none', border: 'none',
          cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'var(--text-muted)',
          animation: 'bounce 2s ease-in-out infinite',
        }}
        aria-label="Scroll down"
      >
        <ArrowDown size={18} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        @media (max-width: 768px) {
          #hero > div.container-agency {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #hero > div.container-agency > div:last-child {
            display: none;
          }
          #hero > div.container-agency > div:first-child > div:nth-child(3) > div:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
