import type { PaginatedResponse } from '../types';
export declare const getPaginationParams: (page?: number, limit?: number) => {
    skip: number;
    take: number;
};
export declare const createPaginatedResponse: <T>(items: T[], total: number, page: number, limit: number) => PaginatedResponse<T>;
//# sourceMappingURL=pagination.d.ts.map