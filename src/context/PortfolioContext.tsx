import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESUME_DATA, ProjectItem, ExperienceItem, SkillCategory } from '../data/resumeData';
import { fetchGlobalPortfolioData, saveGlobalPortfolioData, GlobalPortfolioData } from '../services/cloudStorage';
import { subscribePortfolioCloud } from '../services/firebase';

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
  syncStatus: string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY_GLOBAL = 'vedant_portfolio_global_data_v1';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personal, setPersonal] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GLOBAL);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.personal) return parsed.personal;
      } catch (e) {}
    }
    return RESUME_DATA.personal;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GLOBAL);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projects) return parsed.projects;
      } catch (e) {}
    }
    return RESUME_DATA.projects;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GLOBAL);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.experience) return parsed.experience;
      } catch (e) {}
    }
    return RESUME_DATA.experience;
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GLOBAL);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.skills) return parsed.skills;
      } catch (e) {}
    }
    return RESUME_DATA.skills;
  });

  const [syncStatus, setSyncStatus] = useState<string>('SYNCED');

  // Load latest global content from Cloud API for ALL visitors worldwide
  useEffect(() => {
    let isMounted = true;

    async function loadCloudData() {
      const globalData = await fetchGlobalPortfolioData();
      if (globalData && isMounted) {
        if (globalData.personal) setPersonal(globalData.personal);
        if (globalData.projects) setProjects(globalData.projects);
        if (globalData.experience) setExperience(globalData.experience);
        if (globalData.skills) setSkills(globalData.skills);
      }
    }

    loadCloudData();

    // Subscribe to Firebase Cloud Firestore real-time updates if connected
    const unsubscribeCloud = subscribePortfolioCloud((cloudData) => {
      if (!isMounted) return;
      if (cloudData.personal) setPersonal(cloudData.personal);
      if (cloudData.projects) setProjects(cloudData.projects);
      if (cloudData.experience) setExperience(cloudData.experience);
      if (cloudData.skills) setSkills(cloudData.skills);
    });

    return () => {
      isMounted = false;
      unsubscribeCloud();
    };
  }, []);

  const syncAllToCloud = (
    newPersonal: PersonalInfo,
    newProjects: ProjectItem[],
    newExp: ExperienceItem[],
    newSkills: SkillCategory[]
  ) => {
    setSyncStatus('SAVING_TO_CLOUD');
    const fullState: GlobalPortfolioData = {
      personal: newPersonal,
      projects: newProjects,
      experience: newExp,
      skills: newSkills,
    };

    saveGlobalPortfolioData(fullState).then(() => {
      setSyncStatus('SYNCED');
    });
  };

  const updatePersonal = (newPersonal: PersonalInfo) => {
    setPersonal(newPersonal);
    syncAllToCloud(newPersonal, projects, experience, skills);
  };

  const saveProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    syncAllToCloud(personal, newProjects, experience, skills);
  };

  const saveExperience = (newExperience: ExperienceItem[]) => {
    setExperience(newExperience);
    syncAllToCloud(personal, projects, newExperience, skills);
  };

  const saveSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
    syncAllToCloud(personal, projects, experience, newSkills);
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
        syncStatus,
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
