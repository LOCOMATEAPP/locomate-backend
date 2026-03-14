"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class NavigationController {
    service;
    constructor() {
        this.service = new service_1.NavigationService();
    }
    calculateRoute = async (request, reply) => {
        try {
            const user = request.user;
            const data = schema_1.calculateRouteSchema.parse(request.body);
            const result = await this.service.calculateRoute(user.userId, data);
            (0, response_1.sendSuccess)(reply, result, 'Route calculated successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to calculate route', 400);
        }
    };
    getHistory = async (request, reply) => {
        try {
            const user = request.user;
            const { page, limit } = request.query;
            const result = await this.service.getHistory(user.userId, page, limit);
            (0, response_1.sendSuccess)(reply, result, 'History retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get history', 400);
        }
    };
}
exports.NavigationController = NavigationController;
//# sourceMappingURL=controller.js.map