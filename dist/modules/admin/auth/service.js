"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthService = void 0;
const repository_1 = require("./repository");
const password_1 = require("../../../utils/password");
const jwt_1 = require("../../../utils/jwt");
const logger_1 = require("../../../config/logger");
class AdminAuthService {
    repository;
    constructor() {
        this.repository = new repository_1.AdminAuthRepository();
    }
    async login(email, password) {
        const admin = await this.repository.findByEmail(email);
        if (!admin) {
            throw new Error('Invalid credentials');
        }
        if (!admin.isActive) {
            throw new Error('Account is inactive');
        }
        const isPasswordValid = await (0, password_1.comparePassword)(password, admin.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const accessToken = (0, jwt_1.generateAdminAccessToken)({
            adminId: admin.id,
            email: admin.email,
            roleId: admin.roleId,
            type: 'admin',
        });
        const refreshToken = (0, jwt_1.generateAdminRefreshToken)({
            adminId: admin.id,
            email: admin.email,
            roleId: admin.roleId,
            type: 'admin',
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.repository.saveRefreshToken(admin.id, refreshToken, expiresAt);
        logger_1.logger.info({ adminId: admin.id, email: admin.email }, 'Admin logged in');
        return {
            accessToken,
            refreshToken,
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role.name,
            },
        };
    }
    async refreshAccessToken(refreshToken) {
        try {
            const payload = (0, jwt_1.verifyAdminRefreshToken)(refreshToken);
            const tokenRecord = await this.repository.findRefreshToken(refreshToken);
            if (!tokenRecord) {
                throw new Error('Invalid refresh token');
            }
            if (tokenRecord.expiresAt < new Date()) {
                await this.repository.deleteRefreshToken(refreshToken);
                throw new Error('Refresh token expired');
            }
            const admin = await this.repository.findByEmail(payload.email);
            if (!admin || !admin.isActive) {
                throw new Error('Admin not found or inactive');
            }
            await this.repository.deleteRefreshToken(refreshToken);
            const newAccessToken = (0, jwt_1.generateAdminAccessToken)({
                adminId: admin.id,
                email: admin.email,
                roleId: admin.roleId,
                type: 'admin',
            });
            const newRefreshToken = (0, jwt_1.generateAdminRefreshToken)({
                adminId: admin.id,
                email: admin.email,
                roleId: admin.roleId,
                type: 'admin',
            });
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await this.repository.saveRefreshToken(admin.id, newRefreshToken, expiresAt);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }
    async logout(adminId, refreshToken) {
        if (refreshToken) {
            await this.repository.deleteRefreshToken(refreshToken);
        }
        else {
            await this.repository.deleteAdminRefreshTokens(adminId);
        }
    }
}
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=service.js.map