"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = require("./logger");
const redis = new ioredis_1.default({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    maxRetriesPerRequest: 3,
});
exports.redis = redis;
redis.on('connect', () => {
    logger_1.logger.info('Redis connected');
});
redis.on('error', (err) => {
    logger_1.logger.error({ err }, 'Redis error');
});
redis.on('close', () => {
    logger_1.logger.warn('Redis connection closed');
});
//# sourceMappingURL=redis.js.map