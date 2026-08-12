import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsConstellation } from './sections/SkillsConstellation';
import { ProjectLab } from './sections/ProjectLab';
import { ExperienceTelemetry } from './sections/ExperienceTelemetry';
import { EducationCredentials } from './sections/EducationCredentials';
import { ContactTerminal } from './sections/ContactTerminal';
import { Footer } from './components/Footer';
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

export const App: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cliOpen, setCliOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [adminTab, setAdminTab] = useState<'dashboard' | 'profile' | 'projects' | 'experience' | 'skills'>('dashboard');

  useEffect(() => {
    // Check path for /admin
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminMode(true);
    }

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setAdminUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogoutAdmin = () => {
    signOut(auth).catch(() => {});
    setAdminUser(null);
    setIsAdminMode(false);
    window.location.hash = '';
  };

  if (isAdminMode) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={user => setAdminUser(user)}
          onExit={() => setIsAdminMode(false)}
        />
      );
    }

    return (
      <AdminLayout
        user={adminUser}
        activeTab={adminTab}
        onTabChange={tab => setAdminTab(tab)}
        onExit={() => setIsAdminMode(false)}
        onLogout={handleLogoutAdmin}
      >
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'profile' && <AdminProfile />}
        {adminTab === 'projects' && <AdminProjects />}
        {adminTab === 'experience' && <AdminExperience />}
        {adminTab === 'skills' && <AdminSkills />}
      </AdminLayout>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
      {/* HUD Reticle Cursor */}
      <CustomCursor />

      {/* Cyber Particle Matrix Background */}
      <CyberBackground />

      {/* Navigation Header */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenCLI={() => setCliOpen(true)}
        onOpenAdmin={() => setIsAdminMode(true)}
      />

      {/* Page Sections */}
      <main className="relative z-10 space-y-12">
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          onOpenCLI={() => setCliOpen(true)}
        />
        <AboutSection />
        <SkillsConstellation />
        <ProjectLab />
        <ExperienceTelemetry />
        <EducationCredentials />
        <ContactTerminal />
      </main>

      {/* Footer */}
      <Footer />

      {/* Integrated Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Secret Diagnostic CLI Terminal Easter Egg */}
      <CLITerminalModal
        isOpen={cliOpen}
        onClose={() => setCliOpen(false)}
      />
    </div>
  );
};

export default App;
