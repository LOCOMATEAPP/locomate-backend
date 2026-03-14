export declare class ParkingService {
    private repository;
    constructor();
    startParking(userId: string, location: string): Promise<{
        location: string;
        duration: number | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        charges: number | null;
        isPaid: boolean;
    }>;
    getActiveSession(userId: string): Promise<{
        currentDuration: number;
        currentCharges: number;
        location: string;
        duration: number | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        charges: number | null;
        isPaid: boolean;
    } | null>;
    endParking(userId: string): Promise<{
        location: string;
        duration: number | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        charges: number | null;
        isPaid: boolean;
    }>;
    getHistory(userId: string, page?: number, limit?: number): Promise<import("../../../types").PaginatedResponse<{
        location: string;
        duration: number | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        charges: number | null;
        isPaid: boolean;
    }>>;
    private calculateCharges;
}
//# sourceMappingURL=service.d.ts.map