import { User } from '@prisma/client';
export declare class AdminUserRepository {
    findUsers(skip?: number, take?: number): Promise<{
        users: ({
            _count: {
                savedItems: number;
                routeHistory: number;
                rewardClaims: number;
            };
        } & {
            name: string | null;
            id: string;
            phone: string;
            email: string | null;
            avatar: string | null;
            gender: string | null;
            dob: Date | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
    }>;
    findById(id: string): Promise<User | null>;
    blockUser(id: string): Promise<User>;
    unblockUser(id: string): Promise<User>;
    getUserActivity(userId: string): Promise<{
        claims: ({
            offer: {
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
            };
        } & {
            id: string;
            userId: string;
            expiresAt: Date;
            offerId: string;
            rewardCode: string;
            isRedeemed: boolean;
            redeemedAt: Date | null;
            claimedAt: Date;
        })[];
        routes: ({
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
        } & {
            duration: number;
            id: string;
            createdAt: Date;
            userId: string;
            storeId: string;
            distance: number;
        })[];
        savedItems: ({
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
            } | null;
            offer: {
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
            } | null;
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            storeId: string | null;
            offerId: string | null;
            itemType: string;
        })[];
        parkingSessions: {
            location: string;
            duration: number | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startTime: Date;
            endTime: Date | null;
            charges: number | null;
            isPaid: boolean;
        }[];
    }>;
}
//# sourceMappingURL=repository.d.ts.map