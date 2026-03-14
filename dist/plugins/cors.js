"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCors = void 0;
const cors_1 = __importDefault(require("@fastify/cors"));
const registerCors = async (app) => {
    await app.register(cors_1.default, {
        origin: process.env.NODE_ENV === 'production'
            ? ['https://yourdomain.com']
            : true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    });
};
exports.registerCors = registerCors;
//# sourceMappingURL=cors.js.map