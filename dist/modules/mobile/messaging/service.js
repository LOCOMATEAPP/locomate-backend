"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const repository_1 = require("./repository");
const pagination_1 = require("../../../utils/pagination");
class MessagingService {
    repository;
    constructor() {
        this.repository = new repository_1.MessagingRepository();
    }
    async getMessages(userId, page, limit) {
        const { skip, take } = (0, pagination_1.getPaginationParams)(page, limit);
        const { messages, total } = await this.repository.findMessages(skip, take);
        // Add read status to each message
        const messagesWithReadStatus = await Promise.all(messages.map(async (message) => ({
            ...message,
            isRead: await this.repository.checkIfRead(userId, message.id),
        })));
        return (0, pagination_1.createPaginatedResponse)(messagesWithReadStatus, total, page || 1, take);
    }
    async markAsRead(userId, messageId) {
        const alreadyRead = await this.repository.checkIfRead(userId, messageId);
        if (alreadyRead) {
            return;
        }
        await this.repository.markAsRead(userId, messageId);
    }
}
exports.MessagingService = MessagingService;
//# sourceMappingURL=service.js.map