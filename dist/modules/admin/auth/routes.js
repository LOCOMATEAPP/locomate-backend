"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthRoutes = void 0;
const controller_1 = require("./controller");
const admin_auth_1 = require("../../../middleware/admin-auth");
const adminAuthRoutes = async (app) => {
    const controller = new controller_1.AdminAuthController();
    app.post('/login', controller.login);
    app.post('/refresh-token', controller.refreshToken);
    app.post('/logout', { preHandler: admin_auth_1.adminAuthMiddleware }, controller.logout);
};
exports.adminAuthRoutes = adminAuthRoutes;
//# sourceMappingURL=routes.js.map