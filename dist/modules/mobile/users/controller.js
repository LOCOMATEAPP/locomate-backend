"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class UserController {
    service;
    constructor() {
        this.service = new service_1.UserService();
    }
    getProfile = async (request, reply) => {
        try {
            const user = request.user;
            const profile = await this.service.getProfile(user.userId);
            (0, response_1.sendSuccess)(reply, profile, 'Profile retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get profile', 400);
        }
    };
    updateProfile = async (request, reply) => {
        try {
            const user = request.user;
            const data = schema_1.updateProfileSchema.parse(request.body);
            const profile = await this.service.updateProfile(user.userId, data);
            (0, response_1.sendSuccess)(reply, profile, 'Profile updated successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to update profile', 400);
        }
    };
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map