import { FastifyReply } from 'fastify';
export declare const sendSuccess: <T>(reply: FastifyReply, data: T, message?: string, statusCode?: number) => FastifyReply;
export declare const sendError: (reply: FastifyReply, error: string, message?: string, statusCode?: number) => FastifyReply;
export declare const sendCreated: <T>(reply: FastifyReply, data: T, message?: string) => FastifyReply;
export declare const sendNoContent: (reply: FastifyReply) => FastifyReply;
//# sourceMappingURL=response.d.ts.map