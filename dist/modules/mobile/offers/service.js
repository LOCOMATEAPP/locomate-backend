"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const repository_1 = require("./repository");
const redis_1 = require("../../../config/redis");
const pagination_1 = require("../../../utils/pagination");
const POPULAR_OFFERS_KEY = 'popular_offers';
const CACHE_TTL = 300; // 5 minutes
class OfferService {
    repository;
    constructor() {
        this.repository = new repository_1.OfferRepository();
    }
    async getOffers(mallId, page, limit) {
        const { skip, take } = (0, pagination_1.getPaginationParams)(page, limit);
        // Try to get from cache for popular offers (first page, no mall filter)
        if (!mallId && page === 1) {
            const cached = await redis_1.redis.get(POPULAR_OFFERS_KEY);
            if (cached) {
                return JSON.parse(cached);
            }
        }
        const { offers, total } = await this.repository.findActiveOffers(mallId, skip, take);
        const result = (0, pagination_1.createPaginatedResponse)(offers, total, page || 1, take);
        // Cache popular offers
        if (!mallId && page === 1) {
            await redis_1.redis.setex(POPULAR_OFFERS_KEY, CACHE_TTL, JSON.stringify(result));
        }
        return result;
    }
    async getOfferById(id) {
        const offer = await this.repository.findById(id);
        if (!offer) {
            throw new Error('Offer not found or expired');
        }
        return offer;
    }
}
exports.OfferService = OfferService;
//# sourceMappingURL=service.js.map