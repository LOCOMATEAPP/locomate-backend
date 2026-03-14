"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthRepository = void 0;
const database_1 = require("../../../config/database");
class AdminAuthRepository {
    async findByEmail(email) {
        return await database_1.prisma.admin.findUnique({
            where: { email },
            include: {
                role: true,
            },
        });
    }
    async saveRefreshToken(adminId, token, expiresAt) {
        return await database_1.prisma.adminRefreshToken.create({
            data: {
                adminId,
                token,
                expiresAt,
            },
        });
    }
    async findRefreshToken(token) {
        return await database_1.prisma.adminRefreshToken.findUnique({
            where: { token },
            include: { admin: true },
        });
    }
    async deleteRefreshToken(token) {
        await database_1.prisma.adminRefreshToken.delete({
            where: { token },
        });
    }
    async deleteAdminRefreshTokens(adminId) {
        await database_1.prisma.adminRefreshToken.deleteMany({
            where: { adminId },
        });
    }
}
exports.AdminAuthRepository = AdminAuthRepository;
//# sourceMappingURL=repository.js.map