import { FastifyRequest, FastifyReply } from 'fastify';
export declare class AuthController {
    private service;
    constructor();
    checkUser: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    sendOTP: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    signup: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    verifyOTP: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    refreshToken: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    logout: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map