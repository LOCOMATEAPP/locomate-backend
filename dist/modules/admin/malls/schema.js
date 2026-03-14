"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFloorSchema = exports.createFloorSchema = exports.updateMallSchema = exports.createMallSchema = void 0;
const zod_1 = require("zod");
exports.createMallSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Mall name is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    state: zod_1.z.string().min(1, 'State is required'),
    zipCode: zod_1.z.string().min(1, 'Zip code is required'),
    latitude: zod_1.z.number().min(-90).max(90),
    longitude: zod_1.z.number().min(-180).max(180),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updateMallSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    address: zod_1.z.string().min(1).optional(),
    city: zod_1.z.string().min(1).optional(),
    state: zod_1.z.string().min(1).optional(),
    zipCode: zod_1.z.string().min(1).optional(),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.createFloorSchema = zod_1.z.object({
    mallId: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1, 'Floor name is required'),
    floorNumber: zod_1.z.number().int().min(-10).max(100),
    mapImage: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updateFloorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    floorNumber: zod_1.z.number().int().min(-10).max(100).optional(),
    mapImage: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=schema.js.map