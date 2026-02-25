import { prisma } from '../../../config/database';
import { Offer } from '@prisma/client';

export class OfferRepository {
  async findActiveOffers(mallId?: string, skip?: number, take?: number) {
    const now = new Date();
    const where = {
      isActive: true,
      deletedAt: null,
      startDate: { lte: now },
      endDate: { gte: now },
      ...(mallId && { mallId }),
    };

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        where,
        skip,
        take,
        include: {
          store: {
            select: {
              id: true,
              name: true,
              logo: true,
              category: true,
            },
          },
          mall: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.offer.count({ where }),
    ]);

    return { offers, total };
  }

  async findById(id: string): Promise<Offer | null> {
    const now = new Date();
    return await prisma.offer.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: {
        store: true,
        mall: true,
      },
    });
  }

  async incrementClaimCount(id: string): Promise<void> {
    await prisma.offer.update({
      where: { id },
      data: {
        claimCount: {
          increment: 1,
        },
      },
    });
  }
}
