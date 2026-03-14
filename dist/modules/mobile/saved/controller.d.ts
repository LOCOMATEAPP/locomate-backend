import { FastifyRequest, FastifyReply } from 'fastify';
export declare class SavedController {
    private service;
    constructor();
    saveStore: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    saveOffer: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    removeSaved: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getSavedItems: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map