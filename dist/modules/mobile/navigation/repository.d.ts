import { Store, RouteHistory } from '@prisma/client';
export declare class NavigationRepository {
    findStoreById(id: string): Promise<Store | null>;
    findStoresByMallId(mallId: string): Promise<Array<{
        id: string;
        coordinateX: number;
        coordinateY: number;
    }>>;
    saveRouteHistory(userId: string, storeId: string, distance: number, duration: number): Promise<RouteHistory>;
    findHistory(userId: string, skip?: number, take?: number): Promise<{
        history: ({
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
        })[];
        total: number;
    }>;
}
//# sourceMappingURL=repository.d.ts.map