"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffersQuerySchema = void 0;
const zod_1 = require("zod");
exports.getOffersQuerySchema = zod_1.z.object({
    mallId: zod_1.z.string().uuid().optional(),
    page: zod_1.z.coerce.number().int().positive().optional(),
    limit: zod_1.z.coerce.number().int().positive().optional(),
});
//# sourceMappingURL=schema.js.map