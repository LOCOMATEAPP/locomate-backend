"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileAuthMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const mobileAuthMiddleware = async (request, reply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return (0, response_1.sendError)(reply, 'No token provided', 'Unauthorized', 401);
        }
        const token = authHeader.substring(7);
        const payload = (0, jwt_1.verifyMobileAccessToken)(token);
        request.user = payload;
    }
    catch (error) {
        return (0, response_1.sendError)(reply, 'Invalid or expired token', 'Unauthorized', 401);
    }
};
exports.mobileAuthMiddleware = mobileAuthMiddleware;
//# sourceMappingURL=mobile-auth.js.map