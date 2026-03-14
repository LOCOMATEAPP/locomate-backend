"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const response_1 = require("../utils/response");
const zod_1 = require("zod");
const errorHandler = (error, request, reply
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    logger_1.logger.error({
        err: error,
        url: request.url,
        method: request.method,
    }, 'Request error');
    if (error instanceof zod_1.ZodError) {
        const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        return (0, response_1.sendError)(reply, messages, 'Validation error', 400);
    }
    if (error.statusCode === 429) {
        return (0, response_1.sendError)(reply, 'Too many requests', 'Rate limit exceeded', 429);
    }
    if (error.statusCode && error.statusCode < 500) {
        return (0, response_1.sendError)(reply, error.message, 'Client error', error.statusCode);
    }
    return (0, response_1.sendError)(reply, 'Internal server error', 'Server error', 500);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map