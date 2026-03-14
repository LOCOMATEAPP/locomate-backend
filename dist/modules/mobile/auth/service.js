"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const repository_1 = require("./repository");
const otp_1 = require("../../../utils/otp");
const jwt_1 = require("../../../utils/jwt");
const logger_1 = require("../../../config/logger");
class AuthService {
    repository;
    constructor() {
        this.repository = new repository_1.AuthRepository();
    }
    async checkUserExists(phone) {
        const user = await this.repository.findUserByPhone(phone);
        if (user) {
            return {
                exists: true,
                user: {
                    id: user.id,
                    phone: user.phone,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                },
            };
        }
        return { exists: false };
    }
    async sendOTP(phone) {
        const otp = (0, otp_1.generateOTP)();
        await (0, otp_1.storeOTP)(phone, otp);
        logger_1.logger.info({ phone }, 'OTP generated');
        // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
        // For development, return OTP in response
        if (process.env.NODE_ENV === 'development') {
            return { message: 'OTP sent successfully', otp };
        }
        return { message: 'OTP sent successfully' };
    }
    async signup(data) {
        const existingUser = await this.repository.findUserByPhone(data.phone);
        if (existingUser) {
            throw new Error('User already exists. Please login instead.');
        }
        const user = await this.repository.createUserWithDetails({
            phone: data.phone,
            name: data.name,
            avatar: data.avatar,
            gender: data.gender,
            dob: data.dob,
        });
        logger_1.logger.info({ userId: user.id, phone: user.phone }, 'User created successfully');
        return {
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                avatar: user.avatar,
                gender: user.gender,
                dob: user.dob,
            },
        };
    }
    async verifyOTPAndLogin(phone, otp) {
        const isValid = await (0, otp_1.verifyOTP)(phone, otp);
        if (!isValid) {
            throw new Error('Invalid or expired OTP');
        }
        const user = await this.repository.findUserByPhone(phone);
        if (!user) {
            throw new Error('User not found. Please signup first.');
        }
        if (!user.isActive) {
            throw new Error('User account is blocked');
        }
        const accessToken = (0, jwt_1.generateMobileAccessToken)({
            userId: user.id,
            phone: user.phone,
            type: 'mobile',
        });
        const refreshToken = (0, jwt_1.generateMobileRefreshToken)({
            userId: user.id,
            phone: user.phone,
            type: 'mobile',
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.repository.saveRefreshToken(user.id, refreshToken, expiresAt);
        logger_1.logger.info({ userId: user.id, phone }, 'User logged in successfully');
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        };
    }
    async refreshAccessToken(refreshToken) {
        try {
            const payload = (0, jwt_1.verifyMobileRefreshToken)(refreshToken);
            const tokenRecord = await this.repository.findRefreshToken(refreshToken);
            if (!tokenRecord) {
                throw new Error('Invalid refresh token');
            }
            if (tokenRecord.expiresAt < new Date()) {
                await this.repository.deleteRefreshToken(refreshToken);
                throw new Error('Refresh token expired');
            }
            const user = await this.repository.findUserByPhone(payload.phone);
            if (!user || !user.isActive) {
                throw new Error('User not found or inactive');
            }
            await this.repository.deleteRefreshToken(refreshToken);
            const newAccessToken = (0, jwt_1.generateMobileAccessToken)({
                userId: user.id,
                phone: user.phone,
                type: 'mobile',
            });
            const newRefreshToken = (0, jwt_1.generateMobileRefreshToken)({
                userId: user.id,
                phone: user.phone,
                type: 'mobile',
            });
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await this.repository.saveRefreshToken(user.id, newRefreshToken, expiresAt);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }
    async logout(userId, refreshToken) {
        if (refreshToken) {
            await this.repository.deleteRefreshToken(refreshToken);
        }
        else {
            await this.repository.deleteUserRefreshTokens(userId);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=service.js.map