import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

export const resumeService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 'user123');
    const res = await api.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

export const jobService = {
  getAll: async () => {
    const res = await api.get('/jobs');
    return res.data;
  },
};

export const matchService = {
  getMatches: async () => {
    const res = await api.get('/matches/user/user123');
    return res.data;
  },
};

export const applicationService = {
  apply: async (jobId: string) => {
    const res = await api.post('/applications', { jobId, userId: 'user123' });
    return res.data;
  },
  getAll: async () => {
    const res = await api.get('/applications/user/user123');
    return res.data;
  },
};

export const blockchainService = {
  verify: async (skill: string) => {
    const res = await api.post('/blockchain/verify', { userId: 'user123', skill });
    return res.data;
  },
  getAll: async () => {
    const res = await api.get('/blockchain/user/user123');
    return res.data;
  },
};