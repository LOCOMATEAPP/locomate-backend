"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingRepository = void 0;
const database_1 = require("../../../config/database");
class MessagingRepository {
    async findMessages(skip, take) {
        const now = new Date();
        const where = {
            OR: [
                { scheduledAt: null },
                { scheduledAt: { lte: now } },
            ],
            sentAt: { not: null },
        };
        const [messages, total] = await Promise.all([
            database_1.prisma.message.findMany({
                where,
                skip,
                take,
                include: {
                    mall: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    store: {
                        select: {
                            id: true,
                            name: true,
                            logo: true,
                        },
                    },
                },
                orderBy: { sentAt: 'desc' },
            }),
            database_1.prisma.message.count({ where }),
        ]);
        return { messages, total };
    }
    async markAsRead(userId, messageId) {
        return await database_1.prisma.messageRead.create({
            data: {
                userId,
                messageId,
            },
        });
    }
    async checkIfRead(userId, messageId) {
        const count = await database_1.prisma.messageRead.count({
            where: {
                userId,
                messageId,
            },
        });
        return count > 0;
    }
}
exports.MessagingRepository = MessagingRepository;
//# sourceMappingURL=repository.js.map