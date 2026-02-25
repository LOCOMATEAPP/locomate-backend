import { prisma } from '../../../config/database';
import { ParkingSession } from '@prisma/client';

export class ParkingRepository {
  async createSession(userId: string, location: string): Promise<ParkingSession> {
    return await prisma.parkingSession.create({
      data: {
        userId,
        location,
      },
    });
  }

  async findActiveSession(userId: string): Promise<ParkingSession | null> {
    return await prisma.parkingSession.findFirst({
      where: {
        userId,
        endTime: null,
      },
      orderBy: { startTime: 'desc' },
    });
  }

  async endSession(id: string, duration: number, charges: number): Promise<ParkingSession> {
    return await prisma.parkingSession.update({
      where: { id },
      data: {
        endTime: new Date(),
        duration,
        charges,
      },
    });
  }

  async findUserSessions(userId: string, skip?: number, take?: number) {
    const where = { userId };

    const [sessions, total] = await Promise.all([
      prisma.parkingSession.findMany({
        where,
        skip,
        take,
        orderBy: { startTime: 'desc' },
      }),
      prisma.parkingSession.count({ where }),
    ]);

    return { sessions, total };
  }
}
