"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class ParkingController {
    service;
    constructor() {
        this.service = new service_1.ParkingService();
    }
    startParking = async (request, reply) => {
        try {
            const user = request.user;
            const { location } = schema_1.startParkingSchema.parse(request.body);
            const result = await this.service.startParking(user.userId, location);
            (0, response_1.sendCreated)(reply, result, 'Parking session started');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to start parking', 400);
        }
    };
    getActiveSession = async (request, reply) => {
        try {
            const user = request.user;
            const result = await this.service.getActiveSession(user.userId);
            (0, response_1.sendSuccess)(reply, result, 'Active session retrieved');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get active session', 400);
        }
    };
    endParking = async (request, reply) => {
        try {
            const user = request.user;
            const result = await this.service.endParking(user.userId);
            (0, response_1.sendSuccess)(reply, result, 'Parking session ended');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to end parking', 400);
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
exports.ParkingController = ParkingController;
//# sourceMappingURL=controller.js.map