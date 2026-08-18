import React, { useState, useRef } from 'react';
import { User, Save, CheckCircle2, Mail, Sparkles, FileText, Upload, Link, Key, ImageIcon, X, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getAdminCreds, ADMIN_CREDS_KEY } from './AdminLogin';

const FIELD_STYLE: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: '#0C0C0C', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px', color: '#fff', fontSize: '13px',
  fontFamily: "'Inter', sans-serif", outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.2s ease',
};
const LABEL_STYLE: React.CSSProperties = {
  display: 'block', fontSize: '10px', fontWeight: 700,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: '#555', marginBottom: '7px',
};
const SECTION_TITLE: React.CSSProperties = {
  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px',
  color: '#fff', display: 'flex', alignItems: 'center', gap: '8px',
  paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)',
  marginBottom: '18px',
};
const CARD_STYLE: React.CSSProperties = {
  background: '#141414', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px', padding: '24px', marginBottom: '16px',
};

export const AdminProfile: React.FC = () => {
  const { personal, updatePersonal } = usePortfolio();
  const [formData, setFormData] = useState({ ...personal });
  const [adminCreds, setAdminCreds] = useState(getAdminCreds());
  const [saved, setSaved] = useState(false);
  const [resumeStatus, setResumeStatus] = useState('');
  const [heroImgStatus, setHeroImgStatus] = useState('');
  const [heroPreview, setHeroPreview] = useState<string>(personal.heroImage || '/assets/images/hero_vedant.jpg');
  const [previewOpen, setPreviewOpen] = useState(false);
  const heroFileRef = useRef<HTMLInputElement>(null);

  /* ── Resume upload ── */
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setFormData(prev => ({ ...prev, resumeUrl: ev.target?.result as string }));
      setResumeStatus(`✓ ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    };
    reader.readAsDataURL(file);
  };

  /* ── Hero image upload ── */
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith('image/')) { setHeroImgStatus('✗ Please select an image file (JPG, PNG, WebP)'); return; }
    if (file.size > 5 * 1024 * 1024) { setHeroImgStatus('✗ File too large. Max 5MB.'); return; }

    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      setHeroPreview(dataUrl);
      setFormData(prev => ({ ...prev, heroImage: dataUrl }));
      setHeroImgStatus(`✓ ${file.name} (${(file.size / 1024).toFixed(1)} KB) — click Save to apply`);
    };
    reader.readAsDataURL(file);
  };

  const handleHeroUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, heroImage: url }));
    if (url.startsWith('http') || url.startsWith('/')) setHeroPreview(url);
  };

  const clearHeroImage = () => {
    setFormData(prev => ({ ...prev, heroImage: '' }));
    setHeroPreview('/assets/images/hero_vedant.jpg');
    setHeroImgStatus('Cleared — default image will be used');
    if (heroFileRef.current) heroFileRef.current.value = '';
  };

  /* ── Save ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(formData);
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(adminCreds));
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '6px' }}>
          Profile & Hero
        </h1>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Edit your personal info, hero section image, resume, and admin password.
        </p>
      </div>

      {/* Success banner */}
      {saved && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 18px', borderRadius: '12px',
          background: 'rgba(198,241,53,0.08)', border: '1px solid rgba(198,241,53,0.3)',
          color: '#C6F135', fontSize: '13px', marginBottom: '20px',
        }}>
          <CheckCircle2 size={16} /> Profile saved and applied live to the portfolio!
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* ── Section 01: Personal Info ── */}
        <div style={CARD_STYLE}>
          <div style={SECTION_TITLE}>
            <User size={15} style={{ color: '#C6F135' }} /> 01 — Personal Information
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={LABEL_STYLE}>Full Name</label>
              <input style={FIELD_STYLE} type="text" required value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Primary Title</label>
              <input style={FIELD_STYLE} type="text" required value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={LABEL_STYLE}>Tagline</label>
              <input style={FIELD_STYLE} type="text" value={formData.tagline || ''}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
          </div>
        </div>

        {/* ── Section 02: Contact & Social ── */}
        <div style={CARD_STYLE}>
          <div style={SECTION_TITLE}>
            <Mail size={15} style={{ color: '#60a5fa' }} /> 02 — Contact & Social Links
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { label: 'Location', key: 'location', type: 'text' },
              { label: 'Phone', key: 'phone', type: 'text' },
              { label: 'Email Address', key: 'email', type: 'email' },
              { label: 'LinkedIn URL', key: 'linkedin', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label style={LABEL_STYLE}>{label}</label>
                <input style={FIELD_STYLE} type={type} value={(formData as any)[key] || ''}
                  onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={LABEL_STYLE}>GitHub URL</label>
              <input style={FIELD_STYLE} type="text" value={formData.github || ''}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
          </div>
        </div>

        {/* ── Section 03: Bio & Summary ── */}
        <div style={CARD_STYLE}>
          <div style={SECTION_TITLE}>
            <Sparkles size={15} style={{ color: '#fbbf24' }} /> 03 — Bio & Professional Summary
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={LABEL_STYLE}>Professional Bio Summary</label>
              <textarea required rows={4} value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                style={{ ...FIELD_STYLE, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Academic / Focus Summary</label>
              <textarea rows={2} value={formData.academicFocus || ''}
                onChange={e => setFormData({ ...formData, academicFocus: e.target.value })}
                style={{ ...FIELD_STYLE, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
          </div>
        </div>

        {/* ── Section 04: Hero Image ── */}
        <div style={CARD_STYLE}>
          <div style={SECTION_TITLE}>
            <ImageIcon size={15} style={{ color: '#C6F135' }} /> 04 — Hero Section Image
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Preview */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: '-2px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #C6F135 0%, transparent 50%)',
                zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: '12px', overflow: 'hidden',
                background: '#0C0C0C', aspectRatio: '3/4',
              }}>
                <img
                  src={heroPreview}
                  alt="Hero preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', mixBlendMode: 'multiply' }}
                  onError={e => { (e.target as HTMLImageElement).src = '/assets/images/hero_vedant.jpg'; }}
                />
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                style={{
                  position: 'absolute', bottom: '6px', right: '6px', zIndex: 10,
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'rgba(12,12,12,0.85)', border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', cursor: 'pointer',
                }}
              >
                <Eye size={13} />
              </button>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Upload area */}
              <div>
                <label style={LABEL_STYLE}>Upload Photo (JPG / PNG / WebP · max 5MB)</label>
                <input
                  ref={heroFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  id="hero-image-input"
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="hero-image-input"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 18px', borderRadius: '12px',
                    border: '2px dashed rgba(198,241,53,0.25)',
                    background: 'rgba(198,241,53,0.04)',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,241,53,0.5)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(198,241,53,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,241,53,0.25)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(198,241,53,0.04)';
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(198,241,53,0.12)', border: '1px solid rgba(198,241,53,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C6F135',
                  }}>
                    <Upload size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Click to upload new photo</div>
                    <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>
                      {heroImgStatus || 'White or light background works best with the neon frame effect'}
                    </div>
                  </div>
                </label>
              </div>

              {/* OR URL */}
              <div>
                <label style={LABEL_STYLE}>Or Enter Image URL</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Link size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                    <input
                      style={{ ...FIELD_STYLE, paddingLeft: '36px' }}
                      type="text"
                      placeholder="https://example.com/photo.jpg"
                      value={typeof formData.heroImage === 'string' && formData.heroImage.startsWith('http') ? formData.heroImage : ''}
                      onChange={e => handleHeroUrlChange(e.target.value)}
                      onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                  {formData.heroImage && (
                    <button type="button" onClick={clearHeroImage}
                      style={{
                        padding: '0 14px', borderRadius: '10px', flexShrink: 0,
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                        color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center',
                      }}
                      title="Clear hero image">
                      <X size={14} />
                    </button>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: '#444', marginTop: '6px' }}>
                  Leave empty to use the default <code style={{ color: '#555' }}>/assets/images/hero_vedant.jpg</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 05: Resume ── */}
        <div style={CARD_STYLE}>
          <div style={SECTION_TITLE}>
            <FileText size={15} style={{ color: '#a78bfa' }} /> 05 — Resume File & Upload
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={LABEL_STYLE}>Upload Resume PDF</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} id="resume-file-input" style={{ display: 'none' }} />
              <label htmlFor="resume-file-input" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)',
                color: '#a78bfa', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>
                <Upload size={14} /> Choose PDF File
              </label>
              {resumeStatus && <span style={{ fontSize: '12px', color: '#C6F135', marginLeft: '12px' }}>{resumeStatus}</span>}
            </div>
            <div>
              <label style={LABEL_STYLE}>Or Enter Resume URL (Google Drive / Dropbox)</label>
              <input style={FIELD_STYLE} type="text"
                placeholder="https://drive.google.com/..."
                value={typeof formData.resumeUrl === 'string' && formData.resumeUrl.startsWith('http') ? formData.resumeUrl : ''}
                onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
          </div>
        </div>

        {/* ── Section 06: Admin Security ── */}
        <div style={CARD_STYLE}>
          <div style={SECTION_TITLE}>
            <Key size={15} style={{ color: '#fbbf24' }} /> 06 — Admin Login & Security
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={LABEL_STYLE}>Admin Email</label>
              <input style={{ ...FIELD_STYLE, color: '#C6F135' }} type="email" required
                value={adminCreds.email}
                onChange={e => setAdminCreds({ ...adminCreds, email: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
            <div>
              <label style={LABEL_STYLE}>Admin Password</label>
              <input style={{ ...FIELD_STYLE, color: '#C6F135' }} type="text" required
                value={adminCreds.password}
                onChange={e => setAdminCreds({ ...adminCreds, password: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '13px 28px', borderRadius: '12px',
            background: '#C6F135', border: 'none',
            color: '#0C0C0C', fontSize: '14px', fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#d4ff3d')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C6F135')}
          >
            <Save size={15} /> Save All Changes
          </button>
        </div>
      </form>

      {/* Full-size preview modal */}
      {previewOpen && (
        <div
          onClick={() => setPreviewOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
            <img src={heroPreview} alt="Hero preview full"
              style={{ width: '100%', borderRadius: '20px', border: '2px solid rgba(198,241,53,0.4)' }}
              onError={e => { (e.target as HTMLImageElement).src = '/assets/images/hero_vedant.jpg'; }}
            />
            <button onClick={() => setPreviewOpen(false)} style={{
              position: 'absolute', top: '12px', right: '12px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(12,12,12,0.8)', border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer',
            }}>
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
