"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const prisma = new client_1.PrismaClient({
    log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'warn', emit: 'event' },
    ],
});
exports.prisma = prisma;
prisma.$on('query', (e) => {
    logger_1.logger.debug({ query: e.query, params: e.params, duration: e.duration }, 'Database query');
});
prisma.$on('error', (e) => {
    logger_1.logger.error({ target: e.target, message: e.message }, 'Database error');
});
prisma.$on('warn', (e) => {
    logger_1.logger.warn({ target: e.target, message: e.message }, 'Database warning');
});
//# sourceMappingURL=database.js.map