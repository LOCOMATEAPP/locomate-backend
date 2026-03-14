import { FastifyRequest, FastifyReply } from 'fastify';
export declare const adminAuthMiddleware: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export declare const requirePermission: (_resource: string, _action: string) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
//# sourceMappingURL=admin-auth.d.ts.map