"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const database_1 = require("../../../config/database");
class AuthRepository {
    async findUserByPhone(phone) {
        return await database_1.prisma.user.findUnique({
            where: { phone },
        });
    }
    async createUser(phone) {
        return await database_1.prisma.user.create({
            data: { phone },
        });
    }
    async createUserWithDetails(data) {
        return await database_1.prisma.user.create({
            data: {
                phone: data.phone,
                name: data.name,
                avatar: data.avatar,
                gender: data.gender,
                dob: data.dob ? new Date(data.dob) : undefined,
            },
        });
    }
    async saveRefreshToken(userId, token, expiresAt) {
        return await database_1.prisma.refreshToken.create({
            data: {
                userId,
                token,
                expiresAt,
            },
        });
    }
    async findRefreshToken(token) {
        return await database_1.prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });
    }
    async deleteRefreshToken(token) {
        await database_1.prisma.refreshToken.delete({
            where: { token },
        });
    }
    async deleteUserRefreshTokens(userId) {
        await database_1.prisma.refreshToken.deleteMany({
            where: { userId },
        });
    }
    async cleanExpiredTokens() {
        await database_1.prisma.refreshToken.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=repository.js.map