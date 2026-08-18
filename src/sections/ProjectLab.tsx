import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Filter } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/resumeData';
import { ProjectModal } from '../components/ProjectModal';

const FILTERS = ['All', 'AI/ML', 'Full-Stack', 'Robotics & CAD'];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export const ProjectLab: React.FC = () => {
  const { projects } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const headerRef = useReveal();
  const gridRef = useReveal();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-agency">
      <div className="container-agency">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div>
            <div className="section-tag">Selected Work</div>
            <h2 className="section-heading">
              Projects That<br />Matter
            </h2>
          </div>

          <a
            href="https://github.com/vedantwadaskar13-cmd"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '999px',
              border: '1px solid var(--border)', color: 'var(--text-b)',
              textDecoration: 'none', fontSize: '13px', fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-b)';
            }}
          >
            <Github size={15} /> View All on GitHub
          </a>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="filter-tabs" style={{ marginBottom: '32px' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Project Grid ── */}
        <div
          ref={gridRef}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{
              gridColumn: '1/-1', textAlign: 'center',
              padding: '60px 20px', color: 'var(--text-muted)',
              fontSize: '14px',
            }}>
              No projects in this category yet.
            </div>
          ) : filtered.map((proj, i) => (
            <div
              key={proj.id}
              className="project-card"
              onClick={() => setSelected(proj)}
              style={{
                opacity: 0,
                animation: `fadeUp 0.5s ease ${i * 0.1}s forwards`,
              }}
            >
              {/* Project image */}
              <img
                src={proj.image}
                alt={proj.title}
                onError={e => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x500/141414/C6F135?text=${encodeURIComponent(proj.category)}`;
                }}
              />

              {/* Overlay */}
              <div className="project-card-overlay">
                {/* Category pill */}
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px', borderRadius: '999px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                  color: 'var(--accent)', marginBottom: '8px',
                }}>
                  {proj.category}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(16px, 1.8vw, 22px)',
                  color: 'var(--text-h)', lineHeight: 1.2,
                  marginBottom: '8px',
                }}>
                  {proj.title}
                </h3>

                {/* Tech stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '4px' }}>
                  {proj.techStack.slice(0, 4).map(t => (
                    <span key={t} style={{
                      fontSize: '10px', color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.08)',
                      padding: '2px 8px', borderRadius: '4px',
                    }}>
                      {t}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      +{proj.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* View CTA — appears on hover */}
                <div className="project-card-cta">
                  View Project <ArrowUpRight size={12} />
                </div>
              </div>

              {/* External link button top-right */}
              {proj.githubUrl && proj.githubUrl !== '#' && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: '14px', right: '14px', zIndex: 5,
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(12,12,12,0.8)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-h)', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = '#0C0C0C';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(12,12,12,0.8)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-h)';
                  }}
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          #projects > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
