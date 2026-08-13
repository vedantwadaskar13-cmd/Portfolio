import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESUME_DATA, ProjectItem, ExperienceItem, SkillCategory } from '../data/resumeData';
import { savePortfolioCloud, subscribePortfolioCloud } from '../services/firebase';

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  academicFocus: string;
  resumeUrl?: string;
  customResumeText?: string;
}

interface PortfolioContextType {
  personal: PersonalInfo;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  updatePersonal: (newPersonal: PersonalInfo) => void;
  saveProjects: (newProjects: ProjectItem[]) => void;
  saveExperience: (newExperience: ExperienceItem[]) => void;
  saveSkills: (newSkills: SkillCategory[]) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY_PERSONAL = 'vedant_portfolio_personal';
const STORAGE_KEY_PROJECTS = 'vedant_portfolio_projects';
const STORAGE_KEY_EXPERIENCE = 'vedant_portfolio_experience';
const STORAGE_KEY_SKILLS = 'vedant_portfolio_skills';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personal, setPersonal] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PERSONAL);
    return saved ? JSON.parse(saved) : RESUME_DATA.personal;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
    return saved ? JSON.parse(saved) : RESUME_DATA.projects;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EXPERIENCE);
    return saved ? JSON.parse(saved) : RESUME_DATA.experience;
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SKILLS);
    return saved ? JSON.parse(saved) : RESUME_DATA.skills;
  });

  // Cross-tab BroadcastChannel for real-time synchronization
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('portfolio_sync_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'UPDATE_ALL') {
          if (event.data.personal) setPersonal(event.data.personal);
          if (event.data.projects) setProjects(event.data.projects);
          if (event.data.experience) setExperience(event.data.experience);
          if (event.data.skills) setSkills(event.data.skills);
        }
      };
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_PERSONAL && e.newValue) setPersonal(JSON.parse(e.newValue));
      if (e.key === STORAGE_KEY_PROJECTS && e.newValue) setProjects(JSON.parse(e.newValue));
      if (e.key === STORAGE_KEY_EXPERIENCE && e.newValue) setExperience(JSON.parse(e.newValue));
      if (e.key === STORAGE_KEY_SKILLS && e.newValue) setSkills(JSON.parse(e.newValue));
    };

    window.addEventListener('storage', handleStorage);

    // Subscribe to Cloud Firestore updates if connected
    const unsubscribeCloud = subscribePortfolioCloud((cloudData) => {
      if (cloudData.personal) {
        setPersonal(cloudData.personal);
        localStorage.setItem(STORAGE_KEY_PERSONAL, JSON.stringify(cloudData.personal));
      }
      if (cloudData.projects) {
        setProjects(cloudData.projects);
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(cloudData.projects));
      }
      if (cloudData.experience) {
        setExperience(cloudData.experience);
        localStorage.setItem(STORAGE_KEY_EXPERIENCE, JSON.stringify(cloudData.experience));
      }
      if (cloudData.skills) {
        setSkills(cloudData.skills);
        localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(cloudData.skills));
      }
    });

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorage);
      unsubscribeCloud();
    };
  }, []);

  const broadcastUpdate = (type: string, data: any) => {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const bc = new BroadcastChannel('portfolio_sync_channel');
        bc.postMessage({ type: 'UPDATE_ALL', ...data });
        bc.close();
      } catch (e) {
        // ignore
      }
    }
  };

  const updatePersonal = (newPersonal: PersonalInfo) => {
    setPersonal(newPersonal);
    localStorage.setItem(STORAGE_KEY_PERSONAL, JSON.stringify(newPersonal));
    savePortfolioCloud({ personal: newPersonal });
    broadcastUpdate('PERSONAL', { personal: newPersonal });
  };

  const saveProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(newProjects));
    savePortfolioCloud({ projects: newProjects });
    broadcastUpdate('PROJECTS', { projects: newProjects });
  };

  const saveExperience = (newExperience: ExperienceItem[]) => {
    setExperience(newExperience);
    localStorage.setItem(STORAGE_KEY_EXPERIENCE, JSON.stringify(newExperience));
    savePortfolioCloud({ experience: newExperience });
    broadcastUpdate('EXPERIENCE', { experience: newExperience });
  };

  const saveSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(newSkills));
    savePortfolioCloud({ skills: newSkills });
    broadcastUpdate('SKILLS', { skills: newSkills });
  };

  return (
    <PortfolioContext.Provider
      value={{
        personal,
        projects,
        experience,
        skills,
        updatePersonal,
        saveProjects,
        saveExperience,
        saveSkills,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
