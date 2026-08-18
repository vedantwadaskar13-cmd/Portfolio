import React, { useEffect, useRef } from 'react';
import { CheckCircle, Download, Code2, Database, Brain, Cpu, Wrench } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

const CHECKLIST = [
  'Detail oriented & precise',
  'Systems-first thinker',
  'Fast learner & adapter',
  'Impact-driven mindset',
];

const TECH_STACK = [
  { label: 'Python',     initial: 'Py',  color: '#3776AB' },
  { label: 'React',      initial: 'Re',  color: '#61DAFB' },
  { label: 'FastAPI',    initial: 'FA',  color: '#009688' },
  { label: 'SQL',        initial: 'Sq',  color: '#336791' },
  { label: 'Power BI',   initial: 'BI',  color: '#F2C811' },
  { label: 'SolidWorks', initial: 'SW',  color: '#FF3D00' },
  { label: 'LangChain',  initial: 'LC',  color: '#C6F135' },
  { label: 'Firebase',   initial: 'Fb',  color: '#FFA000' },
];

export const AboutSection: React.FC = () => {
  const { personal } = usePortfolio();
  const { name, summary, academicFocus, heroImage } = personal;
  const leftRef = useReveal();
  const rightRef = useReveal();

  return (
    <section id="about" className="section-agency">
      <div className="container-agency">

        {/* ── 2-col layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          marginBottom: 'clamp(40px, 5vw, 64px)',
        }}>

          {/* LEFT: Portrait */}
          <div ref={leftRef} className="reveal">
            <div style={{ position: 'relative', maxWidth: '420px' }}>
              {/* Neon lime gradient border */}
              <div style={{
                position: 'absolute', inset: '-2px', borderRadius: '24px',
                background: 'linear-gradient(150deg, var(--accent) 0%, transparent 40%, rgba(198,241,53,0.2) 100%)',
                zIndex: 0,
              }} />
              <div style={{
                position: 'absolute', inset: '2px', borderRadius: '22px',
                background: 'var(--bg-card)', zIndex: 1, overflow: 'hidden',
              }}>
                <img
                  src={heroImage || '/assets/images/hero_vedant.jpg'}
                  alt={name || 'Vedant Wadaskar'}
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>

              {/* Floating experience badge */}
              <div style={{
                position: 'absolute', bottom: '-16px', left: '-16px', zIndex: 10,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '14px 18px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', color: 'var(--text-h)', lineHeight: 1 }}>
                  B.E.
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-b)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>
                  Mech. Eng. Student
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Bio */}
          <div ref={rightRef} className="reveal reveal-delay-1">
            <div className="section-tag">About Me</div>
            <h2 className="section-heading" style={{ marginBottom: '20px' }}>
              The Engineer<br />Behind the Code
            </h2>

            <p style={{ fontSize: '15px', color: 'var(--text-b)', lineHeight: 1.75, marginBottom: '16px' }}>
              {summary
                ? summary.slice(0, 280) + (summary.length > 280 ? '...' : '')
                : 'AI/ML Engineer with hands-on experience building machine learning models, chatbots, and full-stack data-driven applications.'}
            </p>

            {academicFocus && (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>
                {academicFocus}
              </p>
            )}

            {/* Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginBottom: '32px' }}>
              {CHECKLIST.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-b)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Download CV CTA */}
            <a
              href="/assets/Vedant_Wadaskar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="neon-btn"
              style={{ display: 'inline-flex', textDecoration: 'none' }}
            >
              <Download size={15} /> Download CV
            </a>
          </div>
        </div>

        {/* ── Tech Stack Badges Row ── */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '40px',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            marginBottom: '20px', textAlign: 'center',
          }}>
            Technologies I Work With
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px',
          }}>
            {TECH_STACK.map(tech => (
              <div
                key={tech.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '12px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  transition: 'all 0.2s ease', cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
                }}
              >
                {/* Color dot */}
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: tech.color, flexShrink: 0,
                  boxShadow: `0 0 8px ${tech.color}66`,
                }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-h)' }}>
                  {tech.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
          #about > div > div:first-child > div:first-child {
            max-width: 280px !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};
