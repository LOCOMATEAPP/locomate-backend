export declare class RewardService {
    private repository;
    private offerRepository;
    constructor();
    claimOffer(userId: string, offerId: string): Promise<{
        id: string;
        userId: string;
        expiresAt: Date;
        offerId: string;
        rewardCode: string;
        isRedeemed: boolean;
        redeemedAt: Date | null;
        claimedAt: Date;
    }>;
    getMyClaims(userId: string, page?: number, limit?: number): Promise<import("../../../types").PaginatedResponse<{
        offer: {
            store: {
                name: string;
                id: string;
                logo: string | null;
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
    }>>;
    validateReward(rewardCode: string): Promise<{
        id: string;
        userId: string;
        expiresAt: Date;
        offerId: string;
        rewardCode: string;
        isRedeemed: boolean;
        redeemedAt: Date | null;
        claimedAt: Date;
    }>;
    redeemReward(rewardCode: string): Promise<{
        id: string;
        userId: string;
        expiresAt: Date;
        offerId: string;
        rewardCode: string;
        isRedeemed: boolean;
        redeemedAt: Date | null;
        claimedAt: Date;
    }>;
}
//# sourceMappingURL=service.d.ts.map