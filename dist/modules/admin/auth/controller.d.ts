import { FastifyRequest, FastifyReply } from 'fastify';
export declare class AdminAuthController {
    private service;
    constructor();
    login: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    refreshToken: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    logout: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map