import { RewardRepository } from './repository';
import { OfferRepository } from '../offers/repository';
import { generateRewardCode } from '../../../utils/reward-code';
import { getPaginationParams, createPaginatedResponse } from '../../../utils/pagination';

export class RewardService {
  private repository: RewardRepository;
  private offerRepository: OfferRepository;

  constructor() {
    this.repository = new RewardRepository();
    this.offerRepository = new OfferRepository();
  }

  async claimOffer(userId: string, offerId: string) {
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
    const rewardCode = generateRewardCode();

    // Set expiry (30 days from claim)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create claim
    const claim = await this.repository.createClaim(userId, offerId, rewardCode, expiresAt);

    // Increment claim count
    await this.offerRepository.incrementClaimCount(offerId);

    return claim;
  }

  async getMyClaims(userId: string, page?: number, limit?: number) {
    const { skip, take } = getPaginationParams(page, limit);
    const { claims, total } = await this.repository.findUserClaims(userId, skip, take);

    return createPaginatedResponse(claims, total, page || 1, take);
  }

  async validateReward(rewardCode: string) {
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

  async redeemReward(rewardCode: string) {
    const claim = await this.validateReward(rewardCode);
    return await this.repository.redeemReward(rewardCode);
  }
}
