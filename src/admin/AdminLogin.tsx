import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onExit: () => void;
}

export const ADMIN_CREDS_KEY = 'vedant_admin_credentials';

export const getAdminCreds = () => {
  const saved = localStorage.getItem(ADMIN_CREDS_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch {}
  }
  return {
    email: import.meta.env.VITE_ADMIN_EMAIL || 'vedantwadaskar13@gmail.com',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'Vedant@2027#AI',
  };
};

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onExit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const creds = getAdminCreds();

    try {
      if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'vedant-portfolio') {
        const uc = await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess(uc.user); return;
      }
      if (email.trim().toLowerCase() === creds.email.trim().toLowerCase() && password === creds.password) {
        onLoginSuccess({ email: creds.email, uid: 'admin_vedant_verified' });
      } else {
        setError('Invalid credentials. Access denied.');
      }
    } catch {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0C0C0C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,241,53,0.05) 0%, transparent 65%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: '#111',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '40px',
        position: 'relative',
      }}>
        {/* Brand badge */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Logo */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: '#C6F135',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: '#0C0C0C',
            margin: '0 auto 16px',
          }}>
            VW
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: '999px',
            background: 'rgba(198,241,53,0.1)', border: '1px solid rgba(198,241,53,0.3)',
            marginBottom: '14px',
          }}>
            <ShieldCheck size={12} style={{ color: '#C6F135' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C6F135' }}>
              Secure Admin Access
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px',
            color: '#fff', marginBottom: '6px', letterSpacing: '-0.02em',
          }}>
            Portfolio CMS
          </h1>
          <p style={{ fontSize: '13px', color: '#555' }}>
            Authorized access only. Enter your admin credentials.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', borderRadius: '12px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#ef4444', fontSize: '13px', marginBottom: '20px',
          }}>
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
              <input
                type="email" required
                placeholder="vedantwadaskar13@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', paddingLeft: '42px', paddingRight: '16px',
                  paddingTop: '12px', paddingBottom: '12px',
                  background: '#0C0C0C', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', color: '#fff', fontSize: '14px',
                  fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Key size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
              <input
                type="password" required
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', paddingLeft: '42px', paddingRight: '16px',
                  paddingTop: '12px', paddingBottom: '12px',
                  background: '#0C0C0C', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', color: '#fff', fontSize: '14px',
                  fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(198,241,53,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: '#C6F135', borderRadius: '12px', border: 'none',
              color: '#0C0C0C', fontSize: '14px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#d4ff3d'); }}
            onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = '#C6F135'); }}
          >
            {loading ? (
              <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Verifying...</>
            ) : (
              'Enter Admin Portal →'
            )}
          </button>
        </form>

        {/* Back link */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={onExit}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'none', border: 'none', color: '#444',
              fontSize: '13px', cursor: 'pointer', transition: 'color 0.2s ease',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >
            <ArrowLeft size={13} /> Return to Portfolio
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
