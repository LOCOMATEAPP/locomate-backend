"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMallsQuerySchema = void 0;
const zod_1 = require("zod");
exports.getMallsQuerySchema = zod_1.z.object({
    city: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().int().positive().optional(),
    limit: zod_1.z.coerce.number().int().positive().optional(),
});
//# sourceMappingURL=schema.js.map