import { api } from './client';

export const analyticsApi = {
  get: () => api.get('/analytics'),
};
