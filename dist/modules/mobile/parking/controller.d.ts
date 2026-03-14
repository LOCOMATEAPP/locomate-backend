import { FastifyRequest, FastifyReply } from 'fastify';
export declare class ParkingController {
    private service;
    constructor();
    startParking: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getActiveSession: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    endParking: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getHistory: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map