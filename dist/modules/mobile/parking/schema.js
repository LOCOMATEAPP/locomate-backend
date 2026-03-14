"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startParkingSchema = void 0;
const zod_1 = require("zod");
exports.startParkingSchema = zod_1.z.object({
    location: zod_1.z.string().min(1).max(200),
});
//# sourceMappingURL=schema.js.map