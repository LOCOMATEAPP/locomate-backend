import { RewardClaim } from '@prisma/client';
export declare class RewardRepository {
    findClaim(userId: string, offerId: string): Promise<RewardClaim | null>;
    createClaim(userId: string, offerId: string, rewardCode: string, expiresAt: Date): Promise<RewardClaim>;
    findUserClaims(userId: string, skip?: number, take?: number): Promise<{
        claims: ({
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
        })[];
        total: number;
    }>;
    findByRewardCode(rewardCode: string): Promise<RewardClaim | null>;
    redeemReward(rewardCode: string): Promise<RewardClaim>;
}
//# sourceMappingURL=repository.d.ts.map