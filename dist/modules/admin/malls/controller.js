"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMallController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class AdminMallController {
    service;
    constructor() {
        this.service = new service_1.AdminMallService();
    }
    createMall = async (request, reply) => {
        try {
            const data = schema_1.createMallSchema.parse(request.body);
            const result = await this.service.createMall(data);
            (0, response_1.sendSuccess)(reply, result, 'Mall created successfully', 201);
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to create mall', 400);
        }
    };
    updateMall = async (request, reply) => {
        try {
            const { id } = request.params;
            const data = schema_1.updateMallSchema.parse(request.body);
            const result = await this.service.updateMall(id, data);
            (0, response_1.sendSuccess)(reply, result, 'Mall updated successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to update mall', 400);
        }
    };
    deleteMall = async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await this.service.deleteMall(id);
            (0, response_1.sendSuccess)(reply, result, 'Mall deleted successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to delete mall', 400);
        }
    };
    getMalls = async (request, reply) => {
        try {
            const { page = '1', limit = '10' } = request.query;
            const result = await this.service.getMalls(parseInt(page), parseInt(limit));
            (0, response_1.sendSuccess)(reply, result, 'Malls retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to retrieve malls', 400);
        }
    };
    getMallById = async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await this.service.getMallById(id);
            (0, response_1.sendSuccess)(reply, result, 'Mall retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to retrieve mall', 404);
        }
    };
    createFloor = async (request, reply) => {
        try {
            const data = schema_1.createFloorSchema.parse(request.body);
            const result = await this.service.createFloor(data);
            (0, response_1.sendSuccess)(reply, result, 'Floor created successfully', 201);
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to create floor', 400);
        }
    };
    updateFloor = async (request, reply) => {
        try {
            const { id } = request.params;
            const data = schema_1.updateFloorSchema.parse(request.body);
            const result = await this.service.updateFloor(id, data);
            (0, response_1.sendSuccess)(reply, result, 'Floor updated successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to update floor', 400);
        }
    };
    deleteFloor = async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await this.service.deleteFloor(id);
            (0, response_1.sendSuccess)(reply, result, 'Floor deleted successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to delete floor', 400);
        }
    };
    getFloors = async (request, reply) => {
        try {
            const { mallId } = request.params;
            const result = await this.service.getFloors(mallId);
            (0, response_1.sendSuccess)(reply, result, 'Floors retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to retrieve floors', 400);
        }
    };
}
exports.AdminMallController = AdminMallController;
//# sourceMappingURL=controller.js.map