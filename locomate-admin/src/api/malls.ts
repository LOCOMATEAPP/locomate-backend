import { api } from './client';

export const mallsApi = {
  getAll: (page = 1, limit = 10) =>
    api.get('/malls', { params: { page, limit } }),

  getById: (id: string) =>
    api.get(`/malls/${id}`),

  create: (data: any) =>
    api.post('/malls', data),

  update: (id: string, data: any) =>
    api.put(`/malls/${id}`, data),

  delete: (id: string) =>
    api.delete(`/malls/${id}`),

  getFloors: (mallId: string) =>
    api.get(`/malls/${mallId}/floors`),

  createFloor: (data: any) =>
    api.post('/floors', data),

  updateFloor: (id: string, data: any) =>
    api.put(`/floors/${id}`, data),

  deleteFloor: (id: string) =>
    api.delete(`/floors/${id}`),
};
