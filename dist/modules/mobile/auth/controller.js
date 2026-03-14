"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class AuthController {
    service;
    constructor() {
        this.service = new service_1.AuthService();
    }
    checkUser = async (request, reply) => {
        try {
            const { phone } = schema_1.checkUserSchema.parse(request.body);
            const result = await this.service.checkUserExists(phone);
            (0, response_1.sendSuccess)(reply, result, 'User check completed');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to check user', 400);
        }
    };
    sendOTP = async (request, reply) => {
        try {
            const { phone } = schema_1.sendOTPSchema.parse(request.body);
            const result = await this.service.sendOTP(phone);
            (0, response_1.sendSuccess)(reply, result, 'OTP sent successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to send OTP', 400);
        }
    };
    signup = async (request, reply) => {
        try {
            const data = schema_1.signupSchema.parse(request.body);
            const result = await this.service.signup(data);
            (0, response_1.sendSuccess)(reply, result, 'Signup successful', 201);
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Signup failed', 400);
        }
    };
    verifyOTP = async (request, reply) => {
        try {
            const { phone, otp } = schema_1.verifyOTPSchema.parse(request.body);
            const result = await this.service.verifyOTPAndLogin(phone, otp);
            (0, response_1.sendSuccess)(reply, result, 'Login successful');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Login failed', 401);
        }
    };
    refreshToken = async (request, reply) => {
        try {
            const { refreshToken } = schema_1.refreshTokenSchema.parse(request.body);
            const result = await this.service.refreshAccessToken(refreshToken);
            (0, response_1.sendSuccess)(reply, result, 'Token refreshed successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Token refresh failed', 401);
        }
    };
    logout = async (request, reply) => {
        try {
            const user = request.user;
            const { refreshToken } = request.body;
            await this.service.logout(user.userId, refreshToken);
            (0, response_1.sendSuccess)(reply, null, 'Logged out successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Logout failed', 400);
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=controller.js.map