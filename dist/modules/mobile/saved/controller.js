"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class SavedController {
    service;
    constructor() {
        this.service = new service_1.SavedService();
    }
    saveStore = async (request, reply) => {
        try {
            const user = request.user;
            const { storeId } = schema_1.saveStoreSchema.parse(request.body);
            const result = await this.service.saveStore(user.userId, storeId);
            (0, response_1.sendCreated)(reply, result, 'Store saved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to save store', 400);
        }
    };
    saveOffer = async (request, reply) => {
        try {
            const user = request.user;
            const { offerId } = schema_1.saveOfferSchema.parse(request.body);
            const result = await this.service.saveOffer(user.userId, offerId);
            (0, response_1.sendCreated)(reply, result, 'Offer saved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to save offer', 400);
        }
    };
    removeSaved = async (request, reply) => {
        try {
            const user = request.user;
            const { id } = request.params;
            await this.service.removeSaved(id, user.userId);
            (0, response_1.sendSuccess)(reply, null, 'Item removed successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to remove item', 400);
        }
    };
    getSavedItems = async (request, reply) => {
        try {
            const user = request.user;
            const { type } = request.query;
            const result = await this.service.getSavedItems(user.userId, type);
            (0, response_1.sendSuccess)(reply, result, 'Saved items retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get saved items', 400);
        }
    };
}
exports.SavedController = SavedController;
//# sourceMappingURL=controller.js.map