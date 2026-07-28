import axios from 'axios';
import type {
  Resume,
  Job,
  JobMatch,
  Application,
  SkillVerification,
  User,
  AuthResponse,
  AdminStats,
} from '../types';

const TOKEN_KEY = 'jobmatcher_token';
const USER_KEY = 'jobmatcher_user';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the server says our token is invalid/expired → clear session.
// If the server says 403 Forbidden → the user tried to access an admin endpoint; reject silently.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    // 403 is handled at the component level via AdminRoute; no redirect needed here.
    return Promise.reject(error);
  }
);

/*
 * Auth API
 */
export const authService = {
  register: async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { fullName, email, password });
    authService.saveSession(response.data);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    authService.saveSession(response.data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  saveSession: (auth: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, auth.token);
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
  },

  getStoredUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),

  fetchMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    return response.data;
  },
};

/*
 * Admin API
 */
export const adminService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/users');
    return response.data;
  },

  updateUserRole: async (userId: string, role: 'USER' | 'ADMIN'): Promise<User> => {
    const response = await api.put<User>(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  setUserActive: async (userId: string, active: boolean): Promise<User> => {
    const response = await api.put<User>(`/admin/users/${userId}/status`, { active });
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },

  getStats: async (): Promise<AdminStats> => {
    const response = await api.get<AdminStats>('/admin/stats');
    return response.data;
  },

  getJobs: async (): Promise<Job[]> => {
    const response = await api.get<Job[]>('/admin/jobs');
    return response.data;
  },

  createJob: async (job: Partial<Job>): Promise<Job> => {
    const response = await api.post<Job>('/admin/jobs', job);
    return response.data;
  },

  updateJob: async (id: string, job: Partial<Job>): Promise<Job> => {
    const response = await api.put<Job>(`/admin/jobs/${id}`, job);
    return response.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/admin/jobs/${id}`);
  },
};

// Falls back to 'user123' only if nobody is logged in (keeps old demo behavior working).
const currentUserId = (): string => authService.getStoredUser()?.id || 'user123';

/*
 * Resume API
 */
const uploadResume = async (
  file: File,
  userId: string = currentUserId()
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
  userId: string = currentUserId()
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
    userId: string = currentUserId()
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
  userId: string = currentUserId()
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
    userId: string = currentUserId()
  ): Promise<Application> => {
    const response = await api.post<Application>(
      '/applications',
      { jobId, userId }
    );
    return response.data;
  },

  // Used in JobDetail.tsx when clicking "Apply Now"
  applyForJob: async (
    jobId: string,
    matchScore: number = 0,
    userId: string = currentUserId()
  ): Promise<Application> => {
    const response = await api.post<Application>(
      '/applications',
      { jobId, userId, matchScore }
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
  skill: string,
  userId: string = currentUserId()
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
  userId: string = currentUserId()
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