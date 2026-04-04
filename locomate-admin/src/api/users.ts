import { api } from './client';

export const usersApi = {
  getAll: (page = 1, limit = 20) => api.get('/users', { params: { page, limit } }),
  block: (id: string) => api.patch(`/users/${id}/block`),
  unblock: (id: string) => api.patch(`/users/${id}/unblock`),
};
