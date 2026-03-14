"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = void 0;
const fastify_1 = __importDefault(require("fastify"));
const logger_1 = require("./config/logger");
const error_handler_1 = require("./middleware/error-handler");
const cors_1 = require("./plugins/cors");
const helmet_1 = require("./plugins/helmet");
const rate_limit_1 = require("./plugins/rate-limit");
// Mobile routes
const routes_1 = require("./modules/mobile/auth/routes");
const routes_2 = require("./modules/mobile/users/routes");
const routes_3 = require("./modules/mobile/malls/routes");
const routes_4 = require("./modules/mobile/navigation/routes");
const routes_5 = require("./modules/mobile/offers/routes");
const routes_6 = require("./modules/mobile/rewards/routes");
const routes_7 = require("./modules/mobile/saved/routes");
const routes_8 = require("./modules/mobile/messaging/routes");
const routes_9 = require("./modules/mobile/parking/routes");
// Admin routes
const routes_10 = require("./modules/admin/auth/routes");
const routes_11 = require("./modules/admin/malls/routes");
const routes_12 = require("./modules/admin/stores/routes");
const buildApp = async () => {
    const app = (0, fastify_1.default)({
        logger: logger_1.logger,
        trustProxy: true,
        requestIdLogLabel: 'reqId',
    });
    // Register plugins
    await (0, cors_1.registerCors)(app);
    await (0, helmet_1.registerHelmet)(app);
    await (0, rate_limit_1.registerRateLimit)(app);
    // Error handler
    app.setErrorHandler(error_handler_1.errorHandler);
    // Health check
    app.get('/health', async () => {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    });
    // Mobile API routes - v1
    await app.register(routes_1.authRoutes, { prefix: '/api/v1/mobile/auth' });
    await app.register(routes_2.userRoutes, { prefix: '/api/v1/mobile/users' });
    await app.register(routes_3.mallRoutes, { prefix: '/api/v1/mobile/malls' });
    await app.register(routes_4.navigationRoutes, { prefix: '/api/v1/mobile/navigation' });
    await app.register(routes_5.offerRoutes, { prefix: '/api/v1/mobile/offers' });
    await app.register(routes_6.rewardRoutes, { prefix: '/api/v1/mobile/rewards' });
    await app.register(routes_7.savedRoutes, { prefix: '/api/v1/mobile/saved' });
    await app.register(routes_8.messagingRoutes, { prefix: '/api/v1/mobile/messages' });
    await app.register(routes_9.parkingRoutes, { prefix: '/api/v1/mobile/parking' });
    // Admin API routes - v1
    await app.register(routes_10.adminAuthRoutes, { prefix: '/api/v1/admin/auth' });
    await app.register(routes_11.adminMallRoutes, { prefix: '/api/v1/admin' });
    await app.register(routes_12.adminStoreRoutes, { prefix: '/api/v1/admin' });
    return app;
};
exports.buildApp = buildApp;
//# sourceMappingURL=app.js.map