"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const userRoutes = async (app) => {
    const controller = new controller_1.UserController();
    app.get('/profile', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getProfile);
    app.put('/profile', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.updateProfile);
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=routes.js.map