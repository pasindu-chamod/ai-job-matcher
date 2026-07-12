export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  skills: string[];
  experienceYears: number;
  summary?: string;
  atsScore: number;
  strengths: string[];
  suggestions: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  location: string;
  salary: string;
  type: string;
}

export interface JobMatch {
  job: Job;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasoning: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: string;
  matchScore?: number;
  appliedAt: string;
}

export interface SkillVerification {
  skill: string;
  verified: boolean;
  blockchainHash: string;
  issuedAt: string;
}