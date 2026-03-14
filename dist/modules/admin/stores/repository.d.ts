import { Store } from '@prisma/client';
export declare class AdminStoreRepository {
    createStore(data: any): Promise<Store>;
    updateStore(id: string, data: any): Promise<Store>;
    deleteStore(id: string): Promise<void>;
    findStores(mallId?: string, skip?: number, take?: number): Promise<{
        stores: ({
            mall: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                city: string;
                state: string;
                zipCode: string;
                latitude: number;
                longitude: number;
                description: string | null;
                image: string | null;
                deletedAt: Date | null;
            };
            floor: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                mallId: string;
                floorNumber: number;
                mapImage: string | null;
            };
        } & {
            name: string;
            id: string;
            phone: string | null;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            deletedAt: Date | null;
            mallId: string;
            floorId: string;
            category: string;
            logo: string | null;
            images: import("@prisma/client/runtime/library").JsonValue | null;
            website: string | null;
            coordinateX: number;
            coordinateY: number;
        })[];
        total: number;
    }>;
    findById(id: string): Promise<Store | null>;
}
//# sourceMappingURL=repository.d.ts.map