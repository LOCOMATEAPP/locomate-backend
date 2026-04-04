import { api } from './client';

export const offersApi = {
  getAll: (page = 1, limit = 20) => api.get('/offers', { params: { page, limit } }),
  create: (data: any) => api.post('/offers', data),
  update: (id: string, data: any) => api.put(`/offers/${id}`, data),
  delete: (id: string) => api.delete(`/offers/${id}`),
};
