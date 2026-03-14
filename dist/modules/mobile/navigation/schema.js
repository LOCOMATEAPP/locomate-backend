"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRouteSchema = void 0;
const zod_1 = require("zod");
exports.calculateRouteSchema = zod_1.z.object({
    startX: zod_1.z.number(),
    startY: zod_1.z.number(),
    targetStoreId: zod_1.z.string().uuid(),
    mallId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=schema.js.map