"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const repository_1 = require("./repository");
class UserService {
    repository;
    constructor() {
        this.repository = new repository_1.UserRepository();
    }
    async getProfile(userId) {
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user.id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };
    }
    async updateProfile(userId, data) {
        const user = await this.repository.updateProfile(userId, data);
        return {
            id: user.id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=service.js.map