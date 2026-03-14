"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSchema = exports.createStoreSchema = void 0;
const zod_1 = require("zod");
exports.createStoreSchema = zod_1.z.object({
    mallId: zod_1.z.string().uuid('Invalid mall ID'),
    floorId: zod_1.z.string().uuid('Invalid floor ID'),
    name: zod_1.z.string().min(1, 'Store name is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
    description: zod_1.z.string().optional(),
    logo: zod_1.z.string().url().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    website: zod_1.z.string().url().optional(),
    coordinateX: zod_1.z.number().min(0, 'X coordinate must be positive'),
    coordinateY: zod_1.z.number().min(0, 'Y coordinate must be positive'),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updateStoreSchema = zod_1.z.object({
    mallId: zod_1.z.string().uuid().optional(),
    floorId: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().min(1).optional(),
    category: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    logo: zod_1.z.string().url().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    website: zod_1.z.string().url().optional(),
    coordinateX: zod_1.z.number().min(0).optional(),
    coordinateY: zod_1.z.number().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=schema.js.map