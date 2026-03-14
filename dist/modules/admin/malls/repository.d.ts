import { Mall, Floor } from '@prisma/client';
export declare class AdminMallRepository {
    createMall(data: any): Promise<Mall>;
    updateMall(id: string, data: any): Promise<Mall>;
    deleteMall(id: string): Promise<void>;
    findMalls(skip?: number, take?: number): Promise<{
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
    createFloor(data: any): Promise<Floor>;
    updateFloor(id: string, data: any): Promise<Floor>;
    deleteFloor(id: string): Promise<void>;
    findFloors(mallId: string): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        mallId: string;
        floorNumber: number;
        mapImage: string | null;
    }[]>;
}
//# sourceMappingURL=repository.d.ts.map