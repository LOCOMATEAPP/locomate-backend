import { prisma } from '../../../config/database';
import { RewardClaim } from '@prisma/client';

export class RewardRepository {
  async findClaim(userId: string, offerId: string): Promise<RewardClaim | null> {
    return await prisma.rewardClaim.findUnique({
      where: {
        userId_offerId: {
          userId,
          offerId,
        },
      },
    });
  }

  async createClaim(
    userId: string,
    offerId: string,
    rewardCode: string,
    expiresAt: Date
  ): Promise<RewardClaim> {
    return await prisma.rewardClaim.create({
      data: {
        userId,
        offerId,
        rewardCode,
        expiresAt,
      },
      include: {
        offer: {
          include: {
            store: true,
          },
        },
      },
    });
  }

  async findUserClaims(userId: string, skip?: number, take?: number) {
    const where = { userId };

    const [claims, total] = await Promise.all([
      prisma.rewardClaim.findMany({
        where,
        skip,
        take,
        include: {
          offer: {
            include: {
              store: {
                select: {
                  id: true,
                  name: true,
                  logo: true,
                },
              },
            },
          },
        },
        orderBy: { claimedAt: 'desc' },
      }),
      prisma.rewardClaim.count({ where }),
    ]);

    return { claims, total };
  }

  async findByRewardCode(rewardCode: string): Promise<RewardClaim | null> {
    return await prisma.rewardClaim.findUnique({
      where: { rewardCode },
      include: {
        offer: {
          include: {
            store: true,
          },
        },
        user: true,
      },
    });
  }

  async redeemReward(rewardCode: string): Promise<RewardClaim> {
    return await prisma.rewardClaim.update({
      where: { rewardCode },
      data: {
        isRedeemed: true,
        redeemedAt: new Date(),
      },
      include: {
        offer: {
          include: {
            store: true,
          },
        },
      },
    });
  }
}
