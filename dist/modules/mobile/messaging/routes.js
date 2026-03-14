"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagingRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const messagingRoutes = async (app) => {
    const controller = new controller_1.MessagingController();
    app.get('/', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getMessages);
    app.post('/:id/read', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.markAsRead);
};
exports.messagingRoutes = messagingRoutes;
//# sourceMappingURL=routes.js.map