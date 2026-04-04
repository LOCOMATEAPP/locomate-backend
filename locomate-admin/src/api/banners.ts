import { api } from './client';

export const bannersApi = {
  getAll: () => api.get('/banners'),
  create: (data: any) => api.post('/banners', data),
  update: (id: string, data: any) => api.put(`/banners/${id}`, data),
  delete: (id: string) => api.delete(`/banners/${id}`),
};
