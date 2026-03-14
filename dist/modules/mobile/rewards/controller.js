"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardController = void 0;
const service_1 = require("./service");
const schema_1 = require("./schema");
const response_1 = require("../../../utils/response");
class RewardController {
    service;
    constructor() {
        this.service = new service_1.RewardService();
    }
    claimOffer = async (request, reply) => {
        try {
            const user = request.user;
            const { offerId } = schema_1.claimOfferSchema.parse(request.body);
            const result = await this.service.claimOffer(user.userId, offerId);
            (0, response_1.sendCreated)(reply, result, 'Offer claimed successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to claim offer', 400);
        }
    };
    getMyClaims = async (request, reply) => {
        try {
            const user = request.user;
            const { page, limit } = request.query;
            const result = await this.service.getMyClaims(user.userId, page, limit);
            (0, response_1.sendSuccess)(reply, result, 'Claims retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get claims', 400);
        }
    };
    redeemReward = async (request, reply) => {
        try {
            const { rewardCode } = schema_1.redeemRewardSchema.parse(request.body);
            const result = await this.service.redeemReward(rewardCode);
            (0, response_1.sendSuccess)(reply, result, 'Reward redeemed successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to redeem reward', 400);
        }
    };
}
exports.RewardController = RewardController;
//# sourceMappingURL=controller.js.map