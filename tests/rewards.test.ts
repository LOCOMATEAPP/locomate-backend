import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RewardService } from '../src/modules/mobile/rewards/service';
import { RewardRepository } from '../src/modules/mobile/rewards/repository';
import { OfferRepository } from '../src/modules/mobile/offers/repository';

vi.mock('../src/modules/mobile/rewards/repository');
vi.mock('../src/modules/mobile/offers/repository');

describe('RewardService', () => {
  let service: RewardService;
  let rewardRepository: RewardRepository;
  let offerRepository: OfferRepository;

  beforeEach(() => {
    rewardRepository = new RewardRepository();
    offerRepository = new OfferRepository();
    service = new RewardService();
  });

  describe('claimOffer', () => {
    it('should prevent duplicate claim', async () => {
      const userId = 'user-123';
      const offerId = 'offer-123';

      vi.spyOn(rewardRepository, 'findClaim').mockResolvedValue({
        id: 'claim-123',
        userId,
        offerId,
        rewardCode: 'RWD-123',
        isRedeemed: false,
        redeemedAt: null,
        claimedAt: new Date(),
        expiresAt: new Date(),
      } as any);

      await expect(service.claimOffer(userId, offerId)).rejects.toThrow(
        'You have already claimed this offer'
      );
    });

    it('should reject expired offer', async () => {
      const userId = 'user-123';
      const offerId = 'offer-123';

      vi.spyOn(rewardRepository, 'findClaim').mockResolvedValue(null);
      vi.spyOn(offerRepository, 'findById').mockResolvedValue(null);

      await expect(service.claimOffer(userId, offerId)).rejects.toThrow(
        'Offer not found or expired'
      );
    });

    it('should reject when max claims reached', async () => {
      const userId = 'user-123';
      const offerId = 'offer-123';

      vi.spyOn(rewardRepository, 'findClaim').mockResolvedValue(null);
      vi.spyOn(offerRepository, 'findById').mockResolvedValue({
        id: offerId,
        maxClaims: 100,
        claimCount: 100,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
      } as any);

      await expect(service.claimOffer(userId, offerId)).rejects.toThrow(
        'Offer claim limit reached'
      );
    });
  });

  describe('validateReward', () => {
    it('should reject invalid reward code', async () => {
      vi.spyOn(rewardRepository, 'findByRewardCode').mockResolvedValue(null);

      await expect(service.validateReward('INVALID')).rejects.toThrow(
        'Invalid reward code'
      );
    });

    it('should reject already redeemed reward', async () => {
      vi.spyOn(rewardRepository, 'findByRewardCode').mockResolvedValue({
        id: 'claim-123',
        isRedeemed: true,
        expiresAt: new Date(Date.now() + 86400000),
      } as any);

      await expect(service.validateReward('RWD-123')).rejects.toThrow(
        'Reward already redeemed'
      );
    });

    it('should reject expired reward', async () => {
      vi.spyOn(rewardRepository, 'findByRewardCode').mockResolvedValue({
        id: 'claim-123',
        isRedeemed: false,
        expiresAt: new Date(Date.now() - 86400000),
      } as any);

      await expect(service.validateReward('RWD-123')).rejects.toThrow(
        'Reward expired'
      );
    });
  });
});
