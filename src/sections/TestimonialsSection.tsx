import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rohan Mehta',
    title: 'CEO, Shamgar Software Solutions',
    quote: 'Vedant delivered an outstanding AI/ML solution. His machine learning models were accurate and code quality was impeccable. He adapts fast and delivers results — exactly what you need in a fast-paced tech environment.',
    stars: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Dr. Priya Nair',
    title: 'Faculty Advisor, PVG COET',
    quote: 'An exceptional student who bridges mechanical engineering fundamentals with advanced AI capabilities. His agricultural robotics project was innovative, well-researched, and executed with real engineering discipline.',
    stars: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Arjun Patil',
    title: 'Senior ML Engineer',
    quote: "Working with Vedant on data analytics was a genuine pleasure. He turns raw data into actionable insights quickly and builds dashboards that stakeholders actually understand and use. Highly recommend.",
    stars: 5,
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
  },
];

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

export const TestimonialsSection: React.FC = () => {
  const headerRef = useReveal();

  return (
    <section id="testimonials" className="section-agency">
      <div className="container-agency">
        {/* Header */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Kind Words</div>
          <h2 className="section-heading">What People Say</h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card reveal"
              style={{
                transitionDelay: `${i * 0.12}s`,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={14} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={28} style={{ color: 'var(--accent)', opacity: 0.5 }} />

              {/* Quote text */}
              <p style={{
                fontSize: '14px',
                lineHeight: '1.75',
                color: 'var(--text-b)',
                fontStyle: 'italic',
                flex: 1,
              }}>
                "{t.quote}"
              </p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--border)' }} />

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    border: '2px solid var(--accent-border)',
                    objectFit: 'cover',
                  }}
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1a1a1a&color=C6F135&size=88`;
                  }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-h)' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--accent)' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger reveal on scroll */}
      <style>{`
        @media (max-width: 900px) {
          #testimonials > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          #testimonials > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
