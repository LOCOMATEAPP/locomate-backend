import { MessagingRepository } from './repository';
import { getPaginationParams, createPaginatedResponse } from '../../../utils/pagination';

export class MessagingService {
  private repository: MessagingRepository;

  constructor() {
    this.repository = new MessagingRepository();
  }

  async getMessages(userId: string, page?: number, limit?: number) {
    const { skip, take } = getPaginationParams(page, limit);
    const { messages, total } = await this.repository.findMessages(skip, take);

    // Add read status to each message
    const messagesWithReadStatus = await Promise.all(
      messages.map(async (message) => ({
        ...message,
        isRead: await this.repository.checkIfRead(userId, message.id),
      }))
    );

    return createPaginatedResponse(messagesWithReadStatus, total, page || 1, take);
  }

  async markAsRead(userId: string, messageId: string) {
    const alreadyRead = await this.repository.checkIfRead(userId, messageId);
    if (alreadyRead) {
      return;
    }

    await this.repository.markAsRead(userId, messageId);
  }
}
