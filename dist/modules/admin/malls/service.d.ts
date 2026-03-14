import { CreateMallInput, UpdateMallInput, CreateFloorInput, UpdateFloorInput } from './schema';
export declare class AdminMallService {
    private repository;
    constructor();
    createMall(data: CreateMallInput): Promise<{
        id: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number;
        longitude: number;
        description: string | null;
        image: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMall(id: string, data: UpdateMallInput): Promise<{
        id: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number;
        longitude: number;
        description: string | null;
        image: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteMall(id: string): Promise<{
        message: string;
    }>;
    getMalls(page?: number, limit?: number): Promise<{
        malls: {
            id: string;
            name: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            latitude: number;
            longitude: number;
            description: string | null;
            image: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getMallById(id: string): Promise<{
        id: string;
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number;
        longitude: number;
        description: string | null;
        image: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        floors: {
            id: string;
            name: string;
            floorNumber: number;
            mapImage: string | null;
            isActive: boolean;
        }[];
    }>;
    createFloor(data: CreateFloorInput): Promise<{
        id: string;
        mallId: string;
        name: string;
        floorNumber: number;
        mapImage: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateFloor(id: string, data: UpdateFloorInput): Promise<{
        id: string;
        mallId: string;
        name: string;
        floorNumber: number;
        mapImage: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteFloor(id: string): Promise<{
        message: string;
    }>;
    getFloors(mallId: string): Promise<{
        id: string;
        mallId: string;
        name: string;
        floorNumber: number;
        mapImage: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=service.d.ts.map