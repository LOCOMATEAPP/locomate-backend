import { FastifyRequest } from 'fastify';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MobileAuthPayload {
  userId: string;
  phone: string;
  type: 'mobile';
}

export interface AdminAuthPayload {
  adminId: string;
  email: string;
  roleId: string;
  type: 'admin';
}

export interface AuthenticatedRequest extends FastifyRequest {
  user?: MobileAuthPayload | AdminAuthPayload;
}

export interface RouteStep {
  x: number;
  y: number;
  instruction?: string;
}

export interface NavigationResult {
  distance: number;
  duration: number;
  steps: RouteStep[];
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  storeId?: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}
