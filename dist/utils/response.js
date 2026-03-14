"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNoContent = exports.sendCreated = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (reply, data, message = 'Success', statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
        error: null,
    };
    return reply.code(statusCode).send(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (reply, error, message = 'Error', statusCode = 400) => {
    const response = {
        success: false,
        message,
        error,
    };
    return reply.code(statusCode).send(response);
};
exports.sendError = sendError;
const sendCreated = (reply, data, message = 'Created successfully') => {
    return (0, exports.sendSuccess)(reply, data, message, 201);
};
exports.sendCreated = sendCreated;
const sendNoContent = (reply) => {
    return reply.code(204).send();
};
exports.sendNoContent = sendNoContent;
//# sourceMappingURL=response.js.map