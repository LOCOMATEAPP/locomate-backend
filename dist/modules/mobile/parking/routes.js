"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const parkingRoutes = async (app) => {
    const controller = new controller_1.ParkingController();
    app.post('/start', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.startParking);
    app.get('/active', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getActiveSession);
    app.post('/end', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.endParking);
    app.get('/history', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getHistory);
};
exports.parkingRoutes = parkingRoutes;
//# sourceMappingURL=routes.js.map