"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStoreController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class AdminStoreController {
    service;
    constructor() {
        this.service = new service_1.AdminStoreService();
    }
    createStore = async (request, reply) => {
        try {
            const data = schema_1.createStoreSchema.parse(request.body);
            const result = await this.service.createStore(data);
            (0, response_1.sendSuccess)(reply, result, 'Store created successfully', 201);
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to create store', 400);
        }
    };
    updateStore = async (request, reply) => {
        try {
            const { id } = request.params;
            const data = schema_1.updateStoreSchema.parse(request.body);
            const result = await this.service.updateStore(id, data);
            (0, response_1.sendSuccess)(reply, result, 'Store updated successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to update store', 400);
        }
    };
    deleteStore = async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await this.service.deleteStore(id);
            (0, response_1.sendSuccess)(reply, result, 'Store deleted successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to delete store', 400);
        }
    };
    getStores = async (request, reply) => {
        try {
            const { mallId, page = '1', limit = '10' } = request.query;
            const result = await this.service.getStores(mallId, parseInt(page), parseInt(limit));
            (0, response_1.sendSuccess)(reply, result, 'Stores retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to retrieve stores', 400);
        }
    };
    getStoreById = async (request, reply) => {
        try {
            const { id } = request.params;
            const result = await this.service.getStoreById(id);
            (0, response_1.sendSuccess)(reply, result, 'Store retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to retrieve store', 404);
        }
    };
}
exports.AdminStoreController = AdminStoreController;
//# sourceMappingURL=controller.js.map