"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const rewardRoutes = async (app) => {
    const controller = new controller_1.RewardController();
    app.post('/claim', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.claimOffer);
    app.get('/my-claims', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getMyClaims);
    app.post('/redeem', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.redeemReward);
};
exports.rewardRoutes = rewardRoutes;
//# sourceMappingURL=routes.js.map