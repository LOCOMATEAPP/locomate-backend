"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRepository = void 0;
const database_1 = require("../../../config/database");
class RewardRepository {
    async findClaim(userId, offerId) {
        return await database_1.prisma.rewardClaim.findUnique({
            where: {
                userId_offerId: {
                    userId,
                    offerId,
                },
            },
        });
    }
    async createClaim(userId, offerId, rewardCode, expiresAt) {
        return await database_1.prisma.rewardClaim.create({
            data: {
                userId,
                offerId,
                rewardCode,
                expiresAt,
            },
            include: {
                offer: {
                    include: {
                        store: true,
                    },
                },
            },
        });
    }
    async findUserClaims(userId, skip, take) {
        const where = { userId };
        const [claims, total] = await Promise.all([
            database_1.prisma.rewardClaim.findMany({
                where,
                skip,
                take,
                include: {
                    offer: {
                        include: {
                            store: {
                                select: {
                                    id: true,
                                    name: true,
                                    logo: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { claimedAt: 'desc' },
            }),
            database_1.prisma.rewardClaim.count({ where }),
        ]);
        return { claims, total };
    }
    async findByRewardCode(rewardCode) {
        return await database_1.prisma.rewardClaim.findUnique({
            where: { rewardCode },
            include: {
                offer: {
                    include: {
                        store: true,
                    },
                },
                user: true,
            },
        });
    }
    async redeemReward(rewardCode) {
        return await database_1.prisma.rewardClaim.update({
            where: { rewardCode },
            data: {
                isRedeemed: true,
                redeemedAt: new Date(),
            },
            include: {
                offer: {
                    include: {
                        store: true,
                    },
                },
            },
        });
    }
}
exports.RewardRepository = RewardRepository;
//# sourceMappingURL=repository.js.map