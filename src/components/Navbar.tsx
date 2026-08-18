import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Triple-click on logo = admin
  useEffect(() => {
    if (clickCount >= 3) { onOpenAdmin(); setClickCount(0); }
    const t = setTimeout(() => setClickCount(0), 1200);
    return () => clearTimeout(t);
  }, [clickCount]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar-glass${scrolled ? ' scrolled' : ''}`}>
        <div
          className="container-agency"
          style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => setClickCount(c => c + 1)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <div
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '14px', color: '#0C0C0C', letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
            >
              VW
            </div>
            <span
              style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '15px', color: 'var(--text-h)',
                letterSpacing: '-0.01em',
              }}
            >
              Vedant Wadaskar
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-b)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-h)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-b)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onOpenResume}
              className="neon-btn"
              style={{ padding: '10px 22px', fontSize: '13px', display: 'none' }}
              id="nav-resume-btn"
            >
              Download CV
            </button>

            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
              className="neon-btn"
              style={{ padding: '10px 22px', fontSize: '13px' }}
            >
              Let's Talk →
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-h)', display: 'none', padding: '4px',
              }}
              id="hamburger-btn"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'absolute', top: '24px', right: 'var(--pad-x)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-h)',
          }}
        >
          <X size={28} />
        </button>

        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <button className="neon-btn" onClick={() => { setMobileOpen(false); handleNavClick('#contact'); }}>
          Let's Talk →
        </button>
      </div>

      {/* Responsive show/hide rules */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
        }
        @media (min-width: 1024px) {
          #nav-resume-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
};
