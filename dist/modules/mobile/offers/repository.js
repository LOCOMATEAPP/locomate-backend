"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferRepository = void 0;
const database_1 = require("../../../config/database");
class OfferRepository {
    async findActiveOffers(mallId, skip, take) {
        const now = new Date();
        const where = {
            isActive: true,
            deletedAt: null,
            startDate: { lte: now },
            endDate: { gte: now },
            ...(mallId && { mallId }),
        };
        const [offers, total] = await Promise.all([
            database_1.prisma.offer.findMany({
                where,
                skip,
                take,
                include: {
                    store: {
                        select: {
                            id: true,
                            name: true,
                            logo: true,
                            category: true,
                        },
                    },
                    mall: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.offer.count({ where }),
        ]);
        return { offers, total };
    }
    async findById(id) {
        const now = new Date();
        return await database_1.prisma.offer.findFirst({
            where: {
                id,
                isActive: true,
                deletedAt: null,
                startDate: { lte: now },
                endDate: { gte: now },
            },
            include: {
                store: true,
                mall: true,
            },
        });
    }
    async incrementClaimCount(id) {
        await database_1.prisma.offer.update({
            where: { id },
            data: {
                claimCount: {
                    increment: 1,
                },
            },
        });
    }
}
exports.OfferRepository = OfferRepository;
//# sourceMappingURL=repository.js.map