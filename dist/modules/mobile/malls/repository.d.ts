import { Mall, Floor, Store } from '@prisma/client';
export declare class MallRepository {
    findMalls(city?: string, skip?: number, take?: number): Promise<{
        malls: {
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
        }[];
        total: number;
    }>;
    findById(id: string): Promise<Mall | null>;
    findFloorsByMallId(mallId: string): Promise<Floor[]>;
    findStoresByMallId(mallId: string, floorId?: string): Promise<Store[]>;
    searchStores(mallId: string, query: string): Promise<Store[]>;
    findStoreById(id: string): Promise<Store | null>;
}
//# sourceMappingURL=repository.d.ts.map