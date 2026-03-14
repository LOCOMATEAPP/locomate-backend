"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const service_1 = require("./service");
const response_1 = require("../../../utils/response");
class OfferController {
    service;
    constructor() {
        this.service = new service_1.OfferService();
    }
    getOffers = async (request, reply) => {
        try {
            const { mallId, page, limit } = request.query;
            const result = await this.service.getOffers(mallId, page, limit);
            (0, response_1.sendSuccess)(reply, result, 'Offers retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get offers', 400);
        }
    };
    getOfferById = async (request, reply) => {
        try {
            const { id } = request.params;
            const offer = await this.service.getOfferById(id);
            (0, response_1.sendSuccess)(reply, offer, 'Offer retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get offer', 404);
        }
    };
}
exports.OfferController = OfferController;
//# sourceMappingURL=controller.js.map