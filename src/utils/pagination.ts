import { env } from '../config/env';
import type { PaginatedResponse } from '../types';

export const getPaginationParams = (
  page?: number,
  limit?: number
): { skip: number; take: number } => {
  const defaultPageSize = parseInt(env.DEFAULT_PAGE_SIZE);
  const maxPageSize = parseInt(env.MAX_PAGE_SIZE);

  const validPage = Math.max(1, page || 1);
  const validLimit = Math.min(maxPageSize, Math.max(1, limit || defaultPageSize));

  return {
    skip: (validPage - 1) * validLimit,
    take: validLimit,
  };
};

export const createPaginatedResponse = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> => {
  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
