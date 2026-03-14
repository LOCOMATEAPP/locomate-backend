"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../../../config/database");
class UserRepository {
    async findById(id) {
        return await database_1.prisma.user.findUnique({
            where: { id },
        });
    }
    async updateProfile(id, data) {
        return await database_1.prisma.user.update({
            where: { id },
            data,
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=repository.js.map