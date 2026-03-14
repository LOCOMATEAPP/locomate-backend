"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedRoutes = void 0;
const controller_1 = require("./controller");
const mobile_auth_1 = require("../../../middleware/mobile-auth");
const savedRoutes = async (app) => {
    const controller = new controller_1.SavedController();
    app.post('/store', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.saveStore);
    app.post('/offer', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.saveOffer);
    app.delete('/:id', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.removeSaved);
    app.get('/', { preHandler: mobile_auth_1.mobileAuthMiddleware }, controller.getSavedItems);
};
exports.savedRoutes = savedRoutes;
//# sourceMappingURL=routes.js.map