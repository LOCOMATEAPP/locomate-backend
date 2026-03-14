import { Offer } from '@prisma/client';
export declare class AdminOfferRepository {
    createOffer(data: any): Promise<Offer>;
    updateOffer(id: string, data: any): Promise<Offer>;
    deleteOffer(id: string): Promise<void>;
    findOffers(mallId?: string, storeId?: string, skip?: number, take?: number): Promise<{
        offers: ({
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
            mall: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                city: string;
                state: string;
                zipCode: string;
                latitude: number;
                longitude: number;
                description: string | null;
                image: string | null;
                deletedAt: Date | null;
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
        })[];
        total: number;
    }>;
    findById(id: string): Promise<Offer | null>;
    getOfferStats(id: string): Promise<{
        totalClaims: number;
        redeemedClaims: number;
    }>;
}
//# sourceMappingURL=repository.d.ts.map