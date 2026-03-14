"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOfferSchema = exports.saveStoreSchema = void 0;
const zod_1 = require("zod");
exports.saveStoreSchema = zod_1.z.object({
    storeId: zod_1.z.string().uuid(),
});
exports.saveOfferSchema = zod_1.z.object({
    offerId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=schema.js.map