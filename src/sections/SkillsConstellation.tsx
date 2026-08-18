import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const MARQUEE_ITEMS = [
  'Python', 'TensorFlow', 'Scikit-Learn', 'React', 'Node.js', 'FastAPI',
  'SQL', 'Power BI', 'SolidWorks', 'ANSYS', 'LangChain', 'Firebase',
  'Git', 'C++', 'Pandas', 'NumPy', 'Dialogflow', 'CATIA',
  'MySQL', 'SQLite', 'Leaflet.js', 'Express.js', 'Jupyter', 'Matplotlib',
];

// Double for seamless loop
const MARQUEE_DOUBLED = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

const LEVEL_WIDTHS = { Expert: '90%', Advanced: '72%', Intermediate: '52%' };

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

export const SkillsConstellation: React.FC = () => {
  const { skills } = usePortfolio();
  const [openCat, setOpenCat] = useState<string | null>(skills[0]?.category || null);
  const [barsTriggered, setBarsTriggered] = useState(false);
  const rightRef = useRef<HTMLDivElement>(null);
  const headerRef = useReveal();

  // Trigger skill bars when section is visible
  useEffect(() => {
    const el = rightRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setBarsTriggered(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* ─── Marquee ─── */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        paddingBlock: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to right, var(--bg), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to left, var(--bg), transparent)',
          pointerEvents: 'none',
        }} />
        <div className="marquee-track">
          {MARQUEE_DOUBLED.map((item, i) => (
            <div key={i} className="marquee-item">{item}</div>
          ))}
        </div>
      </div>

      {/* ─── Main Skills Content ─── */}
      <div className="container-agency" style={{ paddingBlock: 'var(--section-py)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Left: heading */}
          <div ref={headerRef} className="reveal" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
            <div className="section-tag">My Skills</div>
            <h2 className="section-heading" style={{ marginBottom: '20px' }}>
              Technical<br />Expertise
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: '32px' }}>
              A diverse technical toolkit spanning AI/ML, data engineering, full-stack web development,
              and mechanical CAD — built through real projects and hands-on application.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Python', 'React', 'ML', 'SQL', 'CAD'].map(tag => (
                <span key={tag} style={{
                  padding: '5px 14px', borderRadius: '999px',
                  border: '1px solid var(--border)',
                  fontSize: '12px', fontWeight: 600,
                  color: 'var(--text-b)', letterSpacing: '0.04em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: accordion categories */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {skills.map((cat, catIdx) => {
              const isOpen = openCat === cat.category;
              return (
                <div key={cat.category} style={{
                  borderRadius: '14px',
                  border: `1px solid ${isOpen ? 'var(--accent-border)' : 'var(--border)'}`,
                  background: isOpen ? 'var(--accent-dim)' : 'var(--bg-card)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}>
                  {/* Header */}
                  <button
                    onClick={() => setOpenCat(isOpen ? null : cat.category)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      gap: '14px', padding: '18px 20px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px',
                      color: 'var(--accent)', minWidth: '24px', letterSpacing: '0.04em',
                    }}>
                      0{catIdx + 1}
                    </span>
                    <span style={{
                      flex: 1, fontWeight: 600, fontSize: '15px', color: 'var(--text-h)',
                    }}>
                      {cat.category}
                    </span>
                    <span style={{
                      fontSize: '11px', color: 'var(--text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                    }}>
                      ▾
                    </span>
                  </button>

                  {/* Skills */}
                  {isOpen && (
                    <div style={{ padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {cat.skills.map(skill => (
                        <div key={skill.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-h)' }}>
                              {skill.name}
                            </span>
                            <span style={{
                              fontSize: '10px', fontWeight: 700,
                              color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
                            }}>
                              {skill.level}
                            </span>
                          </div>
                          <div className="skill-bar-track">
                            <div
                              className="skill-bar-fill"
                              style={{ width: barsTriggered ? LEVEL_WIDTHS[skill.level] : '0%' }}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {skill.tags.map(tag => (
                              <span key={tag} style={{
                                fontSize: '10px', fontWeight: 500,
                                color: 'var(--text-b)',
                                background: 'rgba(255,255,255,0.04)',
                                padding: '2px 8px', borderRadius: '4px',
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills > div:last-child { grid-template-columns: 1fr !important; }
          #skills > div:last-child > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
};
