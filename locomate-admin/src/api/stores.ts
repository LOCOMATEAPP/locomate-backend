import { api } from './client';

export const storesApi = {
  getAll: (page = 1, limit = 10, mallId?: string) =>
    api.get('/stores', { params: { page, limit, ...(mallId && { mallId }) } }),

  getById: (id: string) =>
    api.get(`/stores/${id}`),

  create: (data: any) =>
    api.post('/stores', data),

  update: (id: string, data: any) =>
    api.put(`/stores/${id}`, data),

  delete: (id: string) =>
    api.delete(`/stores/${id}`),
};
