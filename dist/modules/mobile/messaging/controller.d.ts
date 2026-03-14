import { FastifyRequest, FastifyReply } from 'fastify';
export declare class MessagingController {
    private service;
    constructor();
    getMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    markAsRead: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map