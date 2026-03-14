import { FastifyRequest, FastifyReply } from 'fastify';
export declare class NavigationController {
    private service;
    constructor();
    calculateRoute: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getHistory: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map