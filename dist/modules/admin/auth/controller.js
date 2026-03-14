"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class AdminAuthController {
    service;
    constructor() {
        this.service = new service_1.AdminAuthService();
    }
    login = async (request, reply) => {
        try {
            const { email, password } = schema_1.adminLoginSchema.parse(request.body);
            const result = await this.service.login(email, password);
            (0, response_1.sendSuccess)(reply, result, 'Login successful');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Login failed', 401);
        }
    };
    refreshToken = async (request, reply) => {
        try {
            const { refreshToken } = schema_1.adminRefreshTokenSchema.parse(request.body);
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
            await this.service.logout(user.adminId, refreshToken);
            (0, response_1.sendSuccess)(reply, null, 'Logged out successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Logout failed', 400);
        }
    };
}
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=controller.js.map