"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMallRoutes = void 0;
const controller_1 = require("./controller");
const admin_auth_1 = require("../../../middleware/admin-auth");
const adminMallRoutes = async (app) => {
    const controller = new controller_1.AdminMallController();
    // All routes require admin authentication
    app.addHook('preHandler', admin_auth_1.adminAuthMiddleware);
    // Mall routes
    app.post('/malls', controller.createMall);
    app.get('/malls', controller.getMalls);
    app.get('/malls/:id', controller.getMallById);
    app.put('/malls/:id', controller.updateMall);
    app.delete('/malls/:id', controller.deleteMall);
    // Floor routes
    app.post('/floors', controller.createFloor);
    app.get('/malls/:mallId/floors', controller.getFloors);
    app.put('/floors/:id', controller.updateFloor);
    app.delete('/floors/:id', controller.deleteFloor);
};
exports.adminMallRoutes = adminMallRoutes;
//# sourceMappingURL=routes.js.map