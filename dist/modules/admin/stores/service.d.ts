import { CreateStoreInput, UpdateStoreInput } from './schema';
export declare class AdminStoreService {
    private repository;
    constructor();
    createStore(data: CreateStoreInput): Promise<{
        id: any;
        mallId: any;
        floorId: any;
        name: any;
        category: any;
        description: any;
        logo: any;
        images: any;
        phone: any;
        email: any;
        website: any;
        coordinateX: any;
        coordinateY: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        mall: {
            id: any;
            name: any;
            city: any;
        } | undefined;
        floor: {
            id: any;
            name: any;
            floorNumber: any;
        } | undefined;
    }>;
    updateStore(id: string, data: UpdateStoreInput): Promise<{
        id: any;
        mallId: any;
        floorId: any;
        name: any;
        category: any;
        description: any;
        logo: any;
        images: any;
        phone: any;
        email: any;
        website: any;
        coordinateX: any;
        coordinateY: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        mall: {
            id: any;
            name: any;
            city: any;
        } | undefined;
        floor: {
            id: any;
            name: any;
            floorNumber: any;
        } | undefined;
    }>;
    deleteStore(id: string): Promise<{
        message: string;
    }>;
    getStores(mallId?: string, page?: number, limit?: number): Promise<{
        stores: {
            id: any;
            mallId: any;
            floorId: any;
            name: any;
            category: any;
            description: any;
            logo: any;
            images: any;
            phone: any;
            email: any;
            website: any;
            coordinateX: any;
            coordinateY: any;
            isActive: any;
            createdAt: any;
            updatedAt: any;
            mall: {
                id: any;
                name: any;
                city: any;
            } | undefined;
            floor: {
                id: any;
                name: any;
                floorNumber: any;
            } | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getStoreById(id: string): Promise<{
        id: any;
        mallId: any;
        floorId: any;
        name: any;
        category: any;
        description: any;
        logo: any;
        images: any;
        phone: any;
        email: any;
        website: any;
        coordinateX: any;
        coordinateY: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        mall: {
            id: any;
            name: any;
            city: any;
        } | undefined;
        floor: {
            id: any;
            name: any;
            floorNumber: any;
        } | undefined;
    }>;
    private formatStoreResponse;
}
//# sourceMappingURL=service.d.ts.map