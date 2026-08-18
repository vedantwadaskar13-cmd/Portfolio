import React, { useEffect, useRef } from 'react';
import { GraduationCap, Award, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export const EducationCredentials: React.FC = () => {
  const { education, certifications } = RESUME_DATA;
  const ref = useReveal();

  return (
    <section id="education" className="section-agency">
      <div className="container-agency">
        {/* Header */}
        <div ref={ref} className="reveal" style={{ marginBottom: '56px' }}>
          <div className="section-tag">Learning</div>
          <h2 className="section-heading">Education &amp; Certifications</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 64px)',
          }}
        >
          {/* Left: Education */}
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <GraduationCap size={14} style={{ color: 'var(--accent)' }} /> Education
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education.map((edu, i) => (
                <div key={edu.id} className="card-agency" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                      background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent)',
                    }}>
                      <GraduationCap size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '4px' }}>
                        {edu.degree}
                      </h3>
                      <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, marginBottom: '10px' }}>
                        {edu.institution}
                      </div>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-b)' }}>
                          <Calendar size={11} /> {edu.period}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-b)' }}>
                          <MapPin size={11} /> {edu.location}
                        </span>
                      </div>
                      <span style={{
                        display: 'inline-block', padding: '4px 10px',
                        borderRadius: '6px', fontSize: '11px',
                        background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                        color: 'var(--accent)',
                      }}>
                        {edu.field}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications */}
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <Award size={14} style={{ color: 'var(--accent)' }} /> Certifications
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {certifications.map((cert, i) => (
                <div key={cert.id} className="card-agency" style={{ padding: '20px 22px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    <Award size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cert.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{cert.issuer}</span>
                      {cert.date && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cert.date}</span>}
                    </div>
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease', flexShrink: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #education > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
