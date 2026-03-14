"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardService = void 0;
const repository_1 = require("./repository");
const repository_2 = require("../offers/repository");
const reward_code_1 = require("../../../utils/reward-code");
const pagination_1 = require("../../../utils/pagination");
class RewardService {
    repository;
    offerRepository;
    constructor() {
        this.repository = new repository_1.RewardRepository();
        this.offerRepository = new repository_2.OfferRepository();
    }
    async claimOffer(userId, offerId) {
        // Check if already claimed
        const existingClaim = await this.repository.findClaim(userId, offerId);
        if (existingClaim) {
            throw new Error('You have already claimed this offer');
        }
        // Validate offer
        const offer = await this.offerRepository.findById(offerId);
        if (!offer) {
            throw new Error('Offer not found or expired');
        }
        // Check max claims
        if (offer.maxClaims && offer.claimCount >= offer.maxClaims) {
            throw new Error('Offer claim limit reached');
        }
        // Generate reward code
        const rewardCode = (0, reward_code_1.generateRewardCode)();
        // Set expiry (30 days from claim)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        // Create claim
        const newClaim = await this.repository.createClaim(userId, offerId, rewardCode, expiresAt);
        // Increment claim count
        await this.offerRepository.incrementClaimCount(offerId);
        return newClaim;
    }
    async getMyClaims(userId, page, limit) {
        const { skip, take } = (0, pagination_1.getPaginationParams)(page, limit);
        const { claims, total } = await this.repository.findUserClaims(userId, skip, take);
        return (0, pagination_1.createPaginatedResponse)(claims, total, page || 1, take);
    }
    async validateReward(rewardCode) {
        const claim = await this.repository.findByRewardCode(rewardCode);
        if (!claim) {
            throw new Error('Invalid reward code');
        }
        if (claim.isRedeemed) {
            throw new Error('Reward already redeemed');
        }
        if (claim.expiresAt < new Date()) {
            throw new Error('Reward expired');
        }
        return claim;
    }
    async redeemReward(rewardCode) {
        await this.validateReward(rewardCode);
        return await this.repository.redeemReward(rewardCode);
    }
}
exports.RewardService = RewardService;
//# sourceMappingURL=service.js.map