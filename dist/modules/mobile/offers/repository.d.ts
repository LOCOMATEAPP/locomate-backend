import { Offer } from '@prisma/client';
export declare class OfferRepository {
    findActiveOffers(mallId?: string, skip?: number, take?: number): Promise<{
        offers: ({
            store: {
                name: string;
                id: string;
                category: string;
                logo: string | null;
            };
            mall: {
                name: string;
                id: string;
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
    incrementClaimCount(id: string): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map