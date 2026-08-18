import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'Machine Learning & AI Systems',
    desc: 'Classification, NLP, recommendation engines, and LLM-powered agentic pipelines using LangChain, Mistral AI, and Scikit-Learn.',
    tag: 'AI/ML',
  },
  {
    num: '02',
    title: 'Full-Stack Web Development',
    desc: 'End-to-end React + Node.js/FastAPI applications with Firebase authentication and real-time data layers.',
    tag: 'Full-Stack',
  },
  {
    num: '03',
    title: 'Data Analytics & Business Intelligence',
    desc: 'Python data stacks (Pandas, NumPy), SQL databases, Power BI dashboards, and exploratory data analysis.',
    tag: 'Data & BI',
  },
  {
    num: '04',
    title: 'Mechanical Engineering & CAD',
    desc: 'SolidWorks 3D modeling, ANSYS finite element analysis, CATIA surface design and engineering blueprints.',
    tag: 'CAD',
  },
  {
    num: '05',
    title: 'Robotics & Automation',
    desc: 'Autonomous field robotics design, agricultural automation systems, and embedded control engineering.',
    tag: 'Robotics',
  },
];

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll('.service-row');
    if (!rows) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
          }, idx * 80);
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    rows.forEach(r => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="section-agency">
      <div className="container-agency">
        {/* Header */}
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-tag">What I Do</div>
            <h2 className="section-heading">Services &amp; Capabilities</h2>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-b)', maxWidth: '340px', lineHeight: 1.6 }}>
            From AI models to full-stack apps — end-to-end engineering at every layer.
          </p>
        </div>

        {/* Numbered rows */}
        <div ref={containerRef}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className="service-row"
              style={{
                opacity: 0,
                transform: 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(198,241,53,0.04)';
                (e.currentTarget as HTMLElement).style.paddingLeft = '12px';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.paddingLeft = '0';
              }}
            >
              {/* Number */}
              <span className="service-num">{svc.num}</span>

              {/* Category tag */}
              <span style={{
                display: 'none',
                padding: '3px 10px', borderRadius: '6px',
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                color: 'var(--accent)', whiteSpace: 'nowrap',
                minWidth: '60px', textAlign: 'center',
              }} className="svc-tag">
                {svc.tag}
              </span>

              {/* Title */}
              <span className="service-title">{svc.title}</span>

              {/* Description */}
              <span className="service-desc">{svc.desc}</span>

              {/* Arrow */}
              <ArrowUpRight size={20} className="service-arrow" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .svc-tag { display: inline-block !important; } }
        @media (max-width: 768px) { .service-row { padding-left: 0 !important; } }
      `}</style>
    </section>
  );
};
