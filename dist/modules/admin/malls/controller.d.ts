import { FastifyRequest, FastifyReply } from 'fastify';
export declare class AdminMallController {
    private service;
    constructor();
    createMall: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    updateMall: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    deleteMall: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getMalls: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getMallById: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    createFloor: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    updateFloor: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    deleteFloor: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getFloors: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map