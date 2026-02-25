import { prisma } from '../../../config/database';
import { Message, MessageRead } from '@prisma/client';

export class MessagingRepository {
  async findMessages(skip?: number, take?: number) {
    const now = new Date();
    const where = {
      OR: [
        { scheduledAt: null },
        { scheduledAt: { lte: now } },
      ],
      sentAt: { not: null },
    };

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
        skip,
        take,
        include: {
          mall: {
            select: {
              id: true,
              name: true,
            },
          },
          store: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
        orderBy: { sentAt: 'desc' },
      }),
      prisma.message.count({ where }),
    ]);

    return { messages, total };
  }

  async markAsRead(userId: string, messageId: string): Promise<MessageRead> {
    return await prisma.messageRead.create({
      data: {
        userId,
        messageId,
      },
    });
  }

  async checkIfRead(userId: string, messageId: string): Promise<boolean> {
    const count = await prisma.messageRead.count({
      where: {
        userId,
        messageId,
      },
    });
    return count > 0;
  }
}
