import { z } from 'zod';
export declare const createMallSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodString;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    description?: string | undefined;
    image?: string | undefined;
}, {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    isActive?: boolean | undefined;
    description?: string | undefined;
    image?: string | undefined;
}>;
export declare const updateMallSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    zipCode: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    zipCode?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    description?: string | undefined;
    image?: string | undefined;
}, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    zipCode?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    description?: string | undefined;
    image?: string | undefined;
}>;
export declare const createFloorSchema: z.ZodObject<{
    mallId: z.ZodString;
    name: z.ZodString;
    floorNumber: z.ZodNumber;
    mapImage: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    mallId: string;
    floorNumber: number;
    mapImage?: string | undefined;
}, {
    name: string;
    mallId: string;
    floorNumber: number;
    isActive?: boolean | undefined;
    mapImage?: string | undefined;
}>;
export declare const updateFloorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    floorNumber: z.ZodOptional<z.ZodNumber>;
    mapImage: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    floorNumber?: number | undefined;
    mapImage?: string | undefined;
}, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    floorNumber?: number | undefined;
    mapImage?: string | undefined;
}>;
export type CreateMallInput = z.infer<typeof createMallSchema>;
export type UpdateMallInput = z.infer<typeof updateMallSchema>;
export type CreateFloorInput = z.infer<typeof createFloorSchema>;
export type UpdateFloorInput = z.infer<typeof updateFloorSchema>;
//# sourceMappingURL=schema.d.ts.map