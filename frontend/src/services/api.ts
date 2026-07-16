import axios from 'axios';
import type {
  Resume,
  Job,
  JobMatch,
  Application,
  SkillVerification,
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
 * Resume API
 */
const uploadResume = async (
  file: File,
  userId: string = 'user123'
): Promise<Resume> => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('userId', userId);

  const response = await api.post<Resume>(
    '/resumes/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

const getUserResume = async (
  userId: string = 'user123'
): Promise<Resume | null> => {
  try {
    const response = await api.get<Resume>(
      `/resumes/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error('Could not load resume:', error);
    return null;
  }
};

export const resumeService = {
  uploadResume,
  getUserResume,

  // Old names are also supported.
  upload: uploadResume,
};

/*
 * Job API
 */
export const jobService = {
  getAllJobs: async (): Promise<Job[]> => {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },
};

/*
 * Matching API
 */
export const matchService = {
  getMatches: async (
    userId: string = 'user123'
  ): Promise<JobMatch[]> => {
    const response = await api.get<JobMatch[]>(
      `/matches/user/${userId}`
    );

    return response.data;
  },
};

/*
 * Application API
 */
const getUserApplications = async (
  userId: string = 'user123'
): Promise<Application[]> => {
  try {
    const response = await api.get<Application[]>(
      `/applications/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error('Could not load applications:', error);
    return [];
  }
};

export const applicationService = {
  apply: async (
    jobId: string,
    userId: string = 'user123'
  ): Promise<Application> => {
    const response = await api.post<Application>(
      '/applications',
      {
        jobId,
        userId,
      }
    );

    return response.data;
  },

  getUserApplications,

  // Old name is also supported.
  getAll: getUserApplications,
};

/*
 * Blockchain API
 */
const verifySkill = async (
  userId: string = 'user123',
  skill: string
): Promise<SkillVerification> => {
  const response = await api.post<SkillVerification>(
    '/blockchain/verify',
    {
      userId,
      skill,
    }
  );

  return response.data;
};

const getUserVerifications = async (
  userId: string = 'user123'
): Promise<SkillVerification[]> => {
  try {
    const response = await api.get<SkillVerification[]>(
      `/blockchain/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error('Could not load skill verifications:', error);
    return [];
  }
};

export const blockchainService = {
  verifySkill,
  getUserVerifications,
};