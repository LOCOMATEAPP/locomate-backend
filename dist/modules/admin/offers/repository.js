"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOfferRepository = void 0;
const database_1 = require("../../../config/database");
class AdminOfferRepository {
    async createOffer(data) {
        return await database_1.prisma.offer.create({
            data,
            include: {
                store: true,
                mall: true,
            },
        });
    }
    async updateOffer(id, data) {
        return await database_1.prisma.offer.update({
            where: { id },
            data,
            include: {
                store: true,
                mall: true,
            },
        });
    }
    async deleteOffer(id) {
        await database_1.prisma.offer.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async findOffers(mallId, storeId, skip, take) {
        const where = {
            deletedAt: null,
            ...(mallId && { mallId }),
            ...(storeId && { storeId }),
        };
        const [offers, total] = await Promise.all([
            database_1.prisma.offer.findMany({
                where,
                skip,
                take,
                include: {
                    store: true,
                    mall: true,
                    _count: {
                        select: { rewardClaims: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.offer.count({ where }),
        ]);
        return { offers, total };
    }
    async findById(id) {
        return await database_1.prisma.offer.findFirst({
            where: { id, deletedAt: null },
            include: {
                store: true,
                mall: true,
                _count: {
                    select: { rewardClaims: true },
                },
            },
        });
    }
    async getOfferStats(id) {
        const [totalClaims, redeemedClaims] = await Promise.all([
            database_1.prisma.rewardClaim.count({
                where: { offerId: id },
            }),
            database_1.prisma.rewardClaim.count({
                where: { offerId: id, isRedeemed: true },
            }),
        ]);
        return { totalClaims, redeemedClaims };
    }
}
exports.AdminOfferRepository = AdminOfferRepository;
//# sourceMappingURL=repository.js.map