import { buildApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { prisma } from './config/database';
import { redis } from './config/redis';

const start = async () => {
  try {
    const app = await buildApp();

    // Test database connection
    await prisma.$connect();
    logger.info('Database connected');

    // Test Redis connection
    await redis.ping();
    logger.info('Redis connected');

    // Start server
    const port = parseInt(env.PORT);
    const host = env.HOST;

    await app.listen({ port, host });

    logger.info(`Server listening on ${host}:${port}`);
    logger.info(`Environment: ${env.NODE_ENV}`);

    // Graceful shutdown
    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.info(`${signal} received, shutting down gracefully`);

        try {
          await app.close();
          await prisma.$disconnect();
          await redis.quit();
          logger.info('Server closed');
          process.exit(0);
        } catch (error) {
          logger.error({ err: error }, 'Error during shutdown');
          process.exit(1);
        }
      });
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

start();
