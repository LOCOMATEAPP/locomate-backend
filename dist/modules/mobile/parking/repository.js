"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingRepository = void 0;
const database_1 = require("../../../config/database");
class ParkingRepository {
    async createSession(userId, location) {
        return await database_1.prisma.parkingSession.create({
            data: {
                userId,
                location,
            },
        });
    }
    async findActiveSession(userId) {
        return await database_1.prisma.parkingSession.findFirst({
            where: {
                userId,
                endTime: null,
            },
            orderBy: { startTime: 'desc' },
        });
    }
    async endSession(id, duration, charges) {
        return await database_1.prisma.parkingSession.update({
            where: { id },
            data: {
                endTime: new Date(),
                duration,
                charges,
            },
        });
    }
    async findUserSessions(userId, skip, take) {
        const where = { userId };
        const [sessions, total] = await Promise.all([
            database_1.prisma.parkingSession.findMany({
                where,
                skip,
                take,
                orderBy: { startTime: 'desc' },
            }),
            database_1.prisma.parkingSession.count({ where }),
        ]);
        return { sessions, total };
    }
}
exports.ParkingRepository = ParkingRepository;
//# sourceMappingURL=repository.js.map