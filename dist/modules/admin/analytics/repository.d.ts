export declare class AnalyticsRepository {
    getTotalUsers(): Promise<number>;
    getActiveUsers(days?: number): Promise<number>;
    getTotalStores(): Promise<number>;
    getActiveOffers(): Promise<number>;
    getTotalClaims(): Promise<number>;
    getRedeemedClaims(): Promise<number>;
    getParkingStats(): Promise<{
        totalSessions: number;
        activeSessions: number;
        totalRevenue: number;
    }>;
    getDailyStats(startDate: Date, endDate: Date): Promise<{
        users: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.UserGroupByOutputType, "createdAt"[]> & {
            _count: number;
        })[];
        claims: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.RewardClaimGroupByOutputType, "claimedAt"[]> & {
            _count: number;
        })[];
    }>;
    getTopStores(limit?: number): Promise<({
        _count: {
            savedItems: number;
            routeHistory: number;
        };
    } & {
        name: string;
        id: string;
        phone: string | null;
        email: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        deletedAt: Date | null;
        mallId: string;
        floorId: string;
        category: string;
        logo: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        website: string | null;
        coordinateX: number;
        coordinateY: number;
    })[]>;
    getTopOffers(limit?: number): Promise<({
        store: {
            name: string;
            id: string;
            phone: string | null;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            deletedAt: Date | null;
            mallId: string;
            floorId: string;
            category: string;
            logo: string | null;
            images: import("@prisma/client/runtime/library").JsonValue | null;
            website: string | null;
            coordinateX: number;
            coordinateY: number;
        };
        _count: {
            rewardClaims: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        image: string | null;
        deletedAt: Date | null;
        mallId: string;
        storeId: string;
        title: string;
        discount: string;
        terms: string | null;
        startDate: Date;
        endDate: Date;
        maxClaims: number | null;
        claimCount: number;
    })[]>;
}
//# sourceMappingURL=repository.d.ts.map