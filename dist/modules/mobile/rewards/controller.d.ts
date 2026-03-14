import { FastifyRequest, FastifyReply } from 'fastify';
export declare class RewardController {
    private service;
    constructor();
    claimOffer: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    getMyClaims: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    redeemReward: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map