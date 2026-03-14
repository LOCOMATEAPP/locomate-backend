"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOTPTTL = exports.verifyOTP = exports.storeOTP = exports.generateOTP = void 0;
const redis_1 = require("../config/redis");
const env_1 = require("../config/env");
const OTP_PREFIX = 'otp:';
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOTP = generateOTP;
const storeOTP = async (phone, otp) => {
    const key = `${OTP_PREFIX}${phone}`;
    await redis_1.redis.setex(key, parseInt(env_1.env.OTP_EXPIRY_SECONDS), otp);
};
exports.storeOTP = storeOTP;
const verifyOTP = async (phone, otp) => {
    const key = `${OTP_PREFIX}${phone}`;
    const storedOTP = await redis_1.redis.get(key);
    if (!storedOTP || storedOTP !== otp) {
        return false;
    }
    await redis_1.redis.del(key);
    return true;
};
exports.verifyOTP = verifyOTP;
const getOTPTTL = async (phone) => {
    const key = `${OTP_PREFIX}${phone}`;
    return await redis_1.redis.ttl(key);
};
exports.getOTPTTL = getOTPTTL;
//# sourceMappingURL=otp.js.map