"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const navigationRoutes = async (app) => {
    const controller = new controller_1.NavigationController();
    app.post('/route', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.calculateRoute);
    app.get('/history', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getHistory);
};
exports.navigationRoutes = navigationRoutes;
//# sourceMappingURL=routes.js.map