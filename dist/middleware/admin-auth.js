"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = exports.adminAuthMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const adminAuthMiddleware = async (request, reply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return (0, response_1.sendError)(reply, 'No token provided', 'Unauthorized', 401);
        }
        const token = authHeader.substring(7);
        const payload = (0, jwt_1.verifyAdminAccessToken)(token);
        request.user = payload;
    }
    catch (error) {
        return (0, response_1.sendError)(reply, 'Invalid or expired token', 'Unauthorized', 401);
    }
};
exports.adminAuthMiddleware = adminAuthMiddleware;
const requirePermission = (_resource, _action) => {
    return async (request, reply) => {
        const user = request.user;
        if (!user || user.type !== 'admin') {
            return (0, response_1.sendError)(reply, 'Unauthorized', 'Forbidden', 403);
        }
        // Permission check would be done via database query
        // For now, we'll assume SuperAdmin has all permissions
        // In production, query the role_permissions table
    };
};
exports.requirePermission = requirePermission;
//# sourceMappingURL=admin-auth.js.map