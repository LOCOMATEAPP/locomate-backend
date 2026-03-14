"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const start = async () => {
    try {
        const app = await (0, app_1.buildApp)();
        // Test database connection
        await database_1.prisma.$connect();
        logger_1.logger.info('Database connected');
        // Test Redis connection
        await redis_1.redis.ping();
        logger_1.logger.info('Redis connected');
        // Start server
        const port = parseInt(env_1.env.PORT);
        const host = env_1.env.HOST;
        await app.listen({ port, host });
        logger_1.logger.info(`Server listening on ${host}:${port}`);
        logger_1.logger.info(`Environment: ${env_1.env.NODE_ENV}`);
        // Graceful shutdown
        const signals = ['SIGINT', 'SIGTERM'];
        signals.forEach((signal) => {
            process.on(signal, async () => {
                logger_1.logger.info(`${signal} received, shutting down gracefully`);
                try {
                    await app.close();
                    await database_1.prisma.$disconnect();
                    await redis_1.redis.quit();
                    logger_1.logger.info('Server closed');
                    process.exit(0);
                }
                catch (error) {
                    logger_1.logger.error({ err: error }, 'Error during shutdown');
                    process.exit(1);
                }
            });
        });
    }
    catch (error) {
        logger_1.logger.error({ err: error }, 'Failed to start server');
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map