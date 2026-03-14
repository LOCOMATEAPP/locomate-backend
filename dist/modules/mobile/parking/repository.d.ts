import { ParkingSession } from '@prisma/client';
export declare class ParkingRepository {
    createSession(userId: string, location: string): Promise<ParkingSession>;
    findActiveSession(userId: string): Promise<ParkingSession | null>;
    endSession(id: string, duration: number, charges: number): Promise<ParkingSession>;
    findUserSessions(userId: string, skip?: number, take?: number): Promise<{
        sessions: {
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
        }[];
        total: number;
    }>;
}
//# sourceMappingURL=repository.d.ts.map