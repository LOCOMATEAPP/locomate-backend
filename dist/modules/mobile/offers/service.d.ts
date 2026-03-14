export declare class OfferService {
    private repository;
    constructor();
    getOffers(mallId?: string, page?: number, limit?: number): Promise<any>;
    getOfferById(id: string): Promise<{
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
    }>;
}
//# sourceMappingURL=service.d.ts.map