"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const offerRoutes = async (app) => {
    const controller = new controller_1.OfferController();
    app.get('/', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getOffers);
    app.get('/:id', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getOfferById);
};
exports.offerRoutes = offerRoutes;
//# sourceMappingURL=routes.js.map