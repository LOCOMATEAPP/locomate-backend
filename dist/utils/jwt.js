"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminRefreshToken = exports.verifyAdminAccessToken = exports.generateAdminRefreshToken = exports.generateAdminAccessToken = exports.verifyMobileRefreshToken = exports.verifyMobileAccessToken = exports.generateMobileRefreshToken = exports.generateMobileAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateMobileAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.env.MOBILE_JWT_ACCESS_SECRET, {
        expiresIn: env_1.env.JWT_ACCESS_EXPIRY,
    });
};
exports.generateMobileAccessToken = generateMobileAccessToken;
const generateMobileRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.env.MOBILE_JWT_REFRESH_SECRET, {
        expiresIn: env_1.env.JWT_REFRESH_EXPIRY,
    });
};
exports.generateMobileRefreshToken = generateMobileRefreshToken;
const verifyMobileAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.MOBILE_JWT_ACCESS_SECRET);
};
exports.verifyMobileAccessToken = verifyMobileAccessToken;
const verifyMobileRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.MOBILE_JWT_REFRESH_SECRET);
};
exports.verifyMobileRefreshToken = verifyMobileRefreshToken;
const generateAdminAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.env.ADMIN_JWT_ACCESS_SECRET, {
        expiresIn: env_1.env.JWT_ACCESS_EXPIRY,
    });
};
exports.generateAdminAccessToken = generateAdminAccessToken;
const generateAdminRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.env.ADMIN_JWT_REFRESH_SECRET, {
        expiresIn: env_1.env.JWT_REFRESH_EXPIRY,
    });
};
exports.generateAdminRefreshToken = generateAdminRefreshToken;
const verifyAdminAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.ADMIN_JWT_ACCESS_SECRET);
};
exports.verifyAdminAccessToken = verifyAdminAccessToken;
const verifyAdminRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.ADMIN_JWT_REFRESH_SECRET);
};
exports.verifyAdminRefreshToken = verifyAdminRefreshToken;
//# sourceMappingURL=jwt.js.map