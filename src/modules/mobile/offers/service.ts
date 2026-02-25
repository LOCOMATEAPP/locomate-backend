import { OfferRepository } from './repository';
import { redis } from '../../../config/redis';
import { getPaginationParams, createPaginatedResponse } from '../../../utils/pagination';

const POPULAR_OFFERS_KEY = 'popular_offers';
const CACHE_TTL = 300; // 5 minutes

export class OfferService {
  private repository: OfferRepository;

  constructor() {
    this.repository = new OfferRepository();
  }

  async getOffers(mallId?: string, page?: number, limit?: number) {
    const { skip, take } = getPaginationParams(page, limit);

    // Try to get from cache for popular offers (first page, no mall filter)
    if (!mallId && page === 1) {
      const cached = await redis.get(POPULAR_OFFERS_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    }

    const { offers, total } = await this.repository.findActiveOffers(mallId, skip, take);

    const result = createPaginatedResponse(offers, total, page || 1, take);

    // Cache popular offers
    if (!mallId && page === 1) {
      await redis.setex(POPULAR_OFFERS_KEY, CACHE_TTL, JSON.stringify(result));
    }

    return result;
  }

  async getOfferById(id: string) {
    const offer = await this.repository.findById(id);

    if (!offer) {
      throw new Error('Offer not found or expired');
    }

    return offer;
  }
}
