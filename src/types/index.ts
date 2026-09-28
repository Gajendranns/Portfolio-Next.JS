export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  keyFeatures: string[];
  architectureDetails: string[];
  category: 'web3' | 'enterprise' | 'mobile';
  liveDemoType?: 'crypto-swap' | 'elearning-curriculum' | 'jwt-interceptor';
  metrics?: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  title: string;
  slug: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Specialist", "Advanced", "Proficient"
    proficiency: number; // 0-100 percentage
    years?: string;
    contextNote?: string;
    badge?: string;
  }[];
}
