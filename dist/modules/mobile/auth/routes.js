"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const authRoutes = async (app) => {
    const controller = new controller_1.AuthController();
    app.post('/check-user', controller.checkUser);
    app.post('/send-otp', controller.sendOTP);
    app.post('/signup', controller.signup);
    app.post('/verify-otp', controller.verifyOTP);
    app.post('/refresh-token', controller.refreshToken);
    app.post('/logout', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.logout);
};
exports.authRoutes = authRoutes;
//# sourceMappingURL=routes.js.map