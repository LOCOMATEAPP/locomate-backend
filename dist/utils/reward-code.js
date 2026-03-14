"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRewardCode = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRewardCode = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
    return `RWD-${timestamp}-${random}`;
};
exports.generateRewardCode = generateRewardCode;
//# sourceMappingURL=reward-code.js.map