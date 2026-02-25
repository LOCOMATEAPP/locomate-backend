import { FastifyRequest, FastifyReply } from 'fastify';
import { RewardService } from './service';
import { claimOfferSchema, redeemRewardSchema } from './schema';
import { sendSuccess, sendError, sendCreated } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class RewardController {
  private service: RewardService;

  constructor() {
    this.service = new RewardService();
  }

  claimOffer = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { offerId } = claimOfferSchema.parse(request.body);
      const result = await this.service.claimOffer(user.userId, offerId);
      sendCreated(reply, result, 'Offer claimed successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to claim offer', 400);
    }
  };

  getMyClaims = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { page, limit } = request.query as { page?: number; limit?: number };
      const result = await this.service.getMyClaims(user.userId, page, limit);
      sendSuccess(reply, result, 'Claims retrieved successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to get claims', 400);
    }
  };

  redeemReward = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { rewardCode } = redeemRewardSchema.parse(request.body);
      const result = await this.service.redeemReward(rewardCode);
      sendSuccess(reply, result, 'Reward redeemed successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to redeem reward', 400);
    }
  };
}
