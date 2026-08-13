import React, { createContext, useContext, useState } from 'react';
import { RESUME_DATA, ProjectItem, ExperienceItem, SkillCategory } from '../data/resumeData';

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

  const updatePersonal = (newPersonal: PersonalInfo) => {
    setPersonal(newPersonal);
    localStorage.setItem(STORAGE_KEY_PERSONAL, JSON.stringify(newPersonal));
  };

  const saveProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(newProjects));
  };

  const saveExperience = (newExperience: ExperienceItem[]) => {
    setExperience(newExperience);
    localStorage.setItem(STORAGE_KEY_EXPERIENCE, JSON.stringify(newExperience));
  };

  const saveSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(newSkills));
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
