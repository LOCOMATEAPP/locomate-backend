import { FastifyRequest, FastifyReply } from 'fastify';
export declare class MallController {
    private service;
    constructor();
    getMalls: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getMallById: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getFloors: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getStores: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    searchStores: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getStoreById: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map