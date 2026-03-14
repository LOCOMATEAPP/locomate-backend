"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedRepository = void 0;
const database_1 = require("../../../config/database");
class SavedRepository {
    async saveStore(userId, storeId) {
        return await database_1.prisma.savedItem.create({
            data: {
                userId,
                itemType: 'store',
                storeId,
            },
        });
    }
    async saveOffer(userId, offerId) {
        return await database_1.prisma.savedItem.create({
            data: {
                userId,
                itemType: 'offer',
                offerId,
            },
        });
    }
    async removeSaved(id, userId) {
        await database_1.prisma.savedItem.delete({
            where: {
                id,
                userId,
            },
        });
    }
    async findSavedItems(userId, itemType) {
        return await database_1.prisma.savedItem.findMany({
            where: {
                userId,
                ...(itemType && { itemType }),
            },
            include: {
                store: {
                    select: {
                        id: true,
                        name: true,
                        category: true,
                        logo: true,
                    },
                },
                offer: {
                    select: {
                        id: true,
                        title: true,
                        discount: true,
                        image: true,
                        endDate: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async checkExists(userId, itemType, storeId, offerId) {
        const count = await database_1.prisma.savedItem.count({
            where: {
                userId,
                itemType,
                ...(storeId && { storeId }),
                ...(offerId && { offerId }),
            },
        });
        return count > 0;
    }
}
exports.SavedRepository = SavedRepository;
//# sourceMappingURL=repository.js.map