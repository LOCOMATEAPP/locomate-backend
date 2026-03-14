"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHelmet = void 0;
const helmet_1 = __importDefault(require("@fastify/helmet"));
const registerHelmet = async (app) => {
    await app.register(helmet_1.default, {
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    });
};
exports.registerHelmet = registerHelmet;
//# sourceMappingURL=helmet.js.map