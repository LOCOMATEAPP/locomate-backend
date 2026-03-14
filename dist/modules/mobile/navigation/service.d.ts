import { CalculateRouteInput } from './schema';
export declare class NavigationService {
    private repository;
    constructor();
    calculateRoute(userId: string, data: CalculateRouteInput): Promise<import("../../../types").NavigationResult>;
    getHistory(userId: string, page?: number, limit?: number): Promise<import("../../../types").PaginatedResponse<{
        store: {
            name: string;
            id: string;
            category: string;
            logo: string | null;
        };
    } & {
        duration: number;
        id: string;
        createdAt: Date;
        userId: string;
        storeId: string;
        distance: number;
    }>>;
}
//# sourceMappingURL=service.d.ts.map