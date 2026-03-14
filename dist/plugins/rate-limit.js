"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRateLimit = void 0;
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const env_1 = require("../config/env");
const registerRateLimit = async (app) => {
    await app.register(rate_limit_1.default, {
        max: parseInt(env_1.env.RATE_LIMIT_MAX),
        timeWindow: parseInt(env_1.env.RATE_LIMIT_TIME_WINDOW),
        redis: undefined, // Can be configured to use Redis for distributed rate limiting
    });
};
exports.registerRateLimit = registerRateLimit;
//# sourceMappingURL=rate-limit.js.map