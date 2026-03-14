"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MallController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class MallController {
    service;
    constructor() {
        this.service = new service_1.MallService();
    }
    getMalls = async (request, reply) => {
        try {
            const { city, page, limit } = schema_1.getMallsQuerySchema.parse(request.query);
            const result = await this.service.getMalls(city, page, limit);
            (0, response_1.sendSuccess)(reply, result, 'Malls retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get malls', 400);
        }
    };
    getMallById = async (request, reply) => {
        try {
            const { id } = request.params;
            const mall = await this.service.getMallById(id);
            (0, response_1.sendSuccess)(reply, mall, 'Mall retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get mall', 404);
        }
    };
    getFloors = async (request, reply) => {
        try {
            const { mallId } = request.params;
            const floors = await this.service.getFloorsByMallId(mallId);
            (0, response_1.sendSuccess)(reply, floors, 'Floors retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get floors', 400);
        }
    };
    getStores = async (request, reply) => {
        try {
            const { mallId } = request.params;
            const { floorId } = request.query;
            const stores = await this.service.getStoresByMallId(mallId, floorId);
            (0, response_1.sendSuccess)(reply, stores, 'Stores retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get stores', 400);
        }
    };
    searchStores = async (request, reply) => {
        try {
            const { mallId } = request.params;
            const { q } = request.query;
            const stores = await this.service.searchStores(mallId, q);
            (0, response_1.sendSuccess)(reply, stores, 'Search completed successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Search failed', 400);
        }
    };
    getStoreById = async (request, reply) => {
        try {
            const { id } = request.params;
            const store = await this.service.getStoreById(id);
            (0, response_1.sendSuccess)(reply, store, 'Store retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get store', 404);
        }
    };
}
exports.MallController = MallController;
//# sourceMappingURL=controller.js.map