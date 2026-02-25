import { prisma } from '../../../config/database';
import { Offer } from '@prisma/client';

export class AdminOfferRepository {
  async createOffer(data: any): Promise<Offer> {
    return await prisma.offer.create({
      data,
      include: {
        store: true,
        mall: true,
      },
    });
  }

  async updateOffer(id: string, data: any): Promise<Offer> {
    return await prisma.offer.update({
      where: { id },
      data,
      include: {
        store: true,
        mall: true,
      },
    });
  }

  async deleteOffer(id: string): Promise<void> {
    await prisma.offer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findOffers(mallId?: string, storeId?: string, skip?: number, take?: number) {
    const where = {
      deletedAt: null,
      ...(mallId && { mallId }),
      ...(storeId && { storeId }),
    };

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        where,
        skip,
        take,
        include: {
          store: true,
          mall: true,
          _count: {
            select: { rewardClaims: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.offer.count({ where }),
    ]);

    return { offers, total };
  }

  async findById(id: string): Promise<Offer | null> {
    return await prisma.offer.findFirst({
      where: { id, deletedAt: null },
      include: {
        store: true,
        mall: true,
        _count: {
          select: { rewardClaims: true },
        },
      },
    });
  }

  async getOfferStats(id: string) {
    const [totalClaims, redeemedClaims] = await Promise.all([
      prisma.rewardClaim.count({
        where: { offerId: id },
      }),
      prisma.rewardClaim.count({
        where: { offerId: id, isRedeemed: true },
      }),
    ]);

    return { totalClaims, redeemedClaims };
  }
}
