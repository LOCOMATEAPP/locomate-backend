import { FastifyRequest, FastifyReply } from 'fastify';
export declare class AdminStoreController {
    private service;
    constructor();
    createStore: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    updateStore: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    deleteStore: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getStores: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getStoreById: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map