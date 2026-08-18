import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectLab } from './sections/ProjectLab';
import { SkillsConstellation } from './sections/SkillsConstellation';
import { ExperienceTelemetry } from './sections/ExperienceTelemetry';
import { EducationCredentials } from './sections/EducationCredentials';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactTerminal } from './sections/ContactTerminal';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { CLITerminalModal } from './components/CLITerminalModal';
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProfile } from './admin/AdminProfile';
import { AdminProjects } from './admin/AdminProjects';
import { AdminExperience } from './admin/AdminExperience';
import { AdminSkills } from './admin/AdminSkills';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Stats data
const STATS = [
  { num: '2', unit: '+', label: 'Years Experience' },
  { num: '15', unit: '+', label: 'Projects Completed' },
  { num: '2', unit: '+', label: 'Verified Certs' },
  { num: '100', unit: '%', label: 'Dedication' },
];

const AppContent: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cliOpen, setCliOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [adminTab, setAdminTab] = useState<'dashboard' | 'profile' | 'projects' | 'experience' | 'skills'>('dashboard');
  const handleAdminTabChange = (tab: 'dashboard' | 'profile' | 'projects' | 'experience' | 'skills') => setAdminTab(tab);

  const checkAdminRoute = () => {
    const { pathname, hash, search } = window.location;
    return pathname.includes('/admin') || hash.includes('admin') || search.includes('admin');
  };

  useEffect(() => {
    if (checkAdminRoute()) setIsAdminMode(true);
    const handleNav = () => setIsAdminMode(checkAdminRoute());
    window.addEventListener('popstate', handleNav);
    window.addEventListener('hashchange', handleNav);
    const unsub = onAuthStateChanged(auth, user => { if (user) setAdminUser(user); });
    return () => {
      window.removeEventListener('popstate', handleNav);
      window.removeEventListener('hashchange', handleNav);
      unsub();
    };
  }, []);

  const openAdminPortal = () => { setIsAdminMode(true); window.history.pushState({}, '', '/admin'); };
  const closeAdminPortal = () => { setIsAdminMode(false); window.history.pushState({}, '', '/'); };
  const handleLogout = () => { signOut(auth).catch(() => {}); setAdminUser(null); closeAdminPortal(); };

  if (isAdminMode) {
    if (!adminUser) return <AdminLogin onLoginSuccess={u => setAdminUser(u)} onExit={closeAdminPortal} />;
    return (
      <AdminLayout user={adminUser} activeTab={adminTab} onTabChange={handleAdminTabChange} onExit={closeAdminPortal} onLogout={handleLogout}>
        {adminTab === 'dashboard'  && <AdminDashboard />}
        {adminTab === 'profile'    && <AdminProfile />}
        {adminTab === 'projects'   && <AdminProjects />}
        {adminTab === 'experience' && <AdminExperience />}
        {adminTab === 'skills'     && <AdminSkills />}
      </AdminLayout>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── 1. Sticky Glass Navigation ── */}
      <Navbar
        onOpenAdmin={openAdminPortal}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* ── 2. Hero ── (100vh, portrait, headline) */}
      <HeroSection onOpenResume={() => setResumeOpen(true)} />

      {/* ── 3. Stats Strip ── */}
      <div className="stat-strip">
        {STATS.map((s, i) => (
          <div key={i} className="stat-cell">
            <span className="stat-num">
              {s.num}<span>{s.unit}</span>
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── 4. Services (numbered divider rows) ── */}
      <ServicesSection />

      {/* ── 5. Projects / Selected Work ── */}
      <ProjectLab />

      {/* ── 6. Skills (marquee + category bars) ── */}
      <SkillsConstellation />

      {/* ── 7. Work Experience (vertical timeline) ── */}
      <ExperienceTelemetry />

      {/* ── 8. Education & Certifications ── */}
      <EducationCredentials />

      {/* ── 9. Testimonials ── */}
      <TestimonialsSection />

      {/* ── 10. About Me ── */}
      <AboutSection />

      {/* ── 11. Contact & Footer ── */}
      <ContactTerminal />

      {/* ── Modals ── */}
      <ResumeViewerModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CLITerminalModal isOpen={cliOpen} onClose={() => setCliOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => (
  <PortfolioProvider>
    <AppContent />
  </PortfolioProvider>
);

export default App;
