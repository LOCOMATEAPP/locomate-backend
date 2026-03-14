"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemRewardSchema = exports.claimOfferSchema = void 0;
const zod_1 = require("zod");
exports.claimOfferSchema = zod_1.z.object({
    offerId: zod_1.z.string().uuid(),
});
exports.redeemRewardSchema = zod_1.z.object({
    rewardCode: zod_1.z.string().min(1),
});
//# sourceMappingURL=schema.js.map