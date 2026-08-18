import React, { useEffect, useRef } from 'react';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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

const TYPE_COLORS: Record<string, string> = {
  'Full-time': 'rgba(198,241,53,0.15)',
  'Internship': 'rgba(96,165,250,0.15)',
  'Project': 'rgba(251,191,36,0.15)',
};
const TYPE_TEXT: Record<string, string> = {
  'Full-time': 'var(--accent)',
  'Internship': '#60a5fa',
  'Project': '#fbbf24',
};

export const ExperienceTelemetry: React.FC = () => {
  const { experience } = usePortfolio();
  const headerRef = useReveal();

  return (
    <section id="experience" className="section-agency">
      <div className="container-agency">
        {/* Header */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: '56px' }}>
          <div className="section-tag">Work History</div>
          <h2 className="section-heading">Professional Experience</h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '60px' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '17px', top: '18px', bottom: '0',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--accent-border) 0%, transparent 100%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                className="card-agency"
                style={{
                  padding: '28px 32px',
                  position: 'relative',
                  opacity: 0,
                  transform: 'translateX(-16px)',
                  animation: `slideIn 0.5s ease ${i * 0.12}s forwards`,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-48px', top: '20px',
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                }}>
                  <Briefcase size={15} />
                </div>

                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '4px' }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 600 }}>
                      {exp.company}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '999px',
                      fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                      background: TYPE_COLORS[exp.type] || 'var(--accent-dim)',
                      color: TYPE_TEXT[exp.type] || 'var(--accent)',
                    }}>
                      {exp.type}
                    </span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-b)' }}>
                        <Calendar size={11} /> {exp.period}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-b)' }}>
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />

                {/* Description */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {exp.description.map((d, di) => (
                    <li key={di} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <ChevronRight size={14} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', color: 'var(--text-b)', lineHeight: 1.6 }}>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills used */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.skillsUsed.map(skill => (
                    <span key={skill} style={{
                      padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                      color: 'var(--text-b)',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 640px) {
          #experience > div > div:last-child { padding-left: 48px !important; }
          #experience > div > div:last-child > div > .card-agency > div:first-child { left: -36px !important; }
        }
      `}</style>
    </section>
  );
};
