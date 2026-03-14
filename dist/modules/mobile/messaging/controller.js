"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingController = void 0;
const service_1 = require("./service");
const response_1 = require("../../../utils/response");
class MessagingController {
    service;
    constructor() {
        this.service = new service_1.MessagingService();
    }
    getMessages = async (request, reply) => {
        try {
            const user = request.user;
            const { page, limit } = request.query;
            const result = await this.service.getMessages(user.userId, page, limit);
            (0, response_1.sendSuccess)(reply, result, 'Messages retrieved successfully');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to get messages', 400);
        }
    };
    markAsRead = async (request, reply) => {
        try {
            const user = request.user;
            const { id } = request.params;
            await this.service.markAsRead(user.userId, id);
            (0, response_1.sendSuccess)(reply, null, 'Message marked as read');
        }
        catch (error) {
            (0, response_1.sendError)(reply, error.message, 'Failed to mark message as read', 400);
        }
    };
}
exports.MessagingController = MessagingController;
//# sourceMappingURL=controller.js.map