import React, { useEffect, useRef } from 'react';
import { Search, FileText, Edit3, Code2, Rocket } from 'lucide-react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export const ProcessSection: React.FC = () => {
  const ref = useReveal();

  const steps = [
    { num: '01', Icon: Search,   title: 'DISCOVER',      desc: 'Understanding goals, audience and project requirements.' },
    { num: '02', Icon: FileText, title: 'DEFINE',         desc: 'Research, wireframing and structuring the right solution.' },
    { num: '03', Icon: Edit3,    title: 'DESIGN',         desc: 'Crafting clean, modern and user-centric visuals.' },
    { num: '04', Icon: Code2,    title: 'DEVELOP',        desc: 'Collaborating with developers to bring the design to life.' },
    { num: '05', Icon: Rocket,   title: 'DELIVER',        desc: 'Testing, refining and delivering pixel-perfect results.' },
  ];

  return (
    <div ref={ref} className="reveal" style={{ flex: '0 0 auto', width: '100%' }}>
      <div className="section-label" style={{ marginBottom: '28px' }}>My Process</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {steps.map((step, i) => {
          const IconComp = step.Icon;
          return (
            <div
              key={step.num}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                paddingBottom: i < steps.length - 1 ? '22px' : '0',
                position: 'relative',
              }}
            >
              {/* Vertical connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '23px',
                  top: '48px',
                  bottom: '0',
                  width: '1px',
                  background: 'linear-gradient(to bottom, var(--border-accent), transparent)',
                }} />
              )}

              {/* Faded number */}
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--accent)',
                opacity: 0.5,
                minWidth: '22px',
                paddingTop: '14px',
                fontFamily: 'Inter, sans-serif',
              }}>
                {step.num}
              </div>

              {/* Icon badge */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1px solid var(--border-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: 'var(--bg-card)',
                color: 'var(--text-b)',
              }}>
                <IconComp size={16} />
              </div>

              {/* Text */}
              <div style={{ paddingTop: '8px' }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--text-h)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  {step.title}
                </div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-b)', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
