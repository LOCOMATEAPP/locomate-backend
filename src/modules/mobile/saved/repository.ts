import { prisma } from '../../../config/database';
import { SavedItem } from '@prisma/client';

export class SavedRepository {
  async saveStore(userId: string, storeId: string): Promise<SavedItem> {
    return await prisma.savedItem.create({
      data: {
        userId,
        itemType: 'store',
        storeId,
      },
    });
  }

  async saveOffer(userId: string, offerId: string): Promise<SavedItem> {
    return await prisma.savedItem.create({
      data: {
        userId,
        itemType: 'offer',
        offerId,
      },
    });
  }

  async removeSaved(id: string, userId: string): Promise<void> {
    await prisma.savedItem.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async findSavedItems(userId: string, itemType?: string) {
    return await prisma.savedItem.findMany({
      where: {
        userId,
        ...(itemType && { itemType }),
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            category: true,
            logo: true,
          },
        },
        offer: {
          select: {
            id: true,
            title: true,
            discount: true,
            image: true,
            endDate: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async checkExists(userId: string, itemType: string, storeId?: string, offerId?: string): Promise<boolean> {
    const count = await prisma.savedItem.count({
      where: {
        userId,
        itemType,
        ...(storeId && { storeId }),
        ...(offerId && { offerId }),
      },
    });
    return count > 0;
  }
}
