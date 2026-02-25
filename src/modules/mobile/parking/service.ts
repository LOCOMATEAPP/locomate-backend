import { ParkingRepository } from './repository';
import { env } from '../../../config/env';
import { getPaginationParams, createPaginatedResponse } from '../../../utils/pagination';

export class ParkingService {
  private repository: ParkingRepository;

  constructor() {
    this.repository = new ParkingRepository();
  }

  async startParking(userId: string, location: string) {
    const activeSession = await this.repository.findActiveSession(userId);
    if (activeSession) {
      throw new Error('You already have an active parking session');
    }

    return await this.repository.createSession(userId, location);
  }

  async getActiveSession(userId: string) {
    const session = await this.repository.findActiveSession(userId);
    if (!session) {
      return null;
    }

    const duration = Math.floor((Date.now() - session.startTime.getTime()) / 1000 / 60);
    const charges = this.calculateCharges(duration);

    return {
      ...session,
      currentDuration: duration,
      currentCharges: charges,
    };
  }

  async endParking(userId: string) {
    const session = await this.repository.findActiveSession(userId);
    if (!session) {
      throw new Error('No active parking session found');
    }

    const duration = Math.floor((Date.now() - session.startTime.getTime()) / 1000 / 60);
    const charges = this.calculateCharges(duration);

    return await this.repository.endSession(session.id, duration, charges);
  }

  async getHistory(userId: string, page?: number, limit?: number) {
    const { skip, take } = getPaginationParams(page, limit);
    const { sessions, total } = await this.repository.findUserSessions(userId, skip, take);

    return createPaginatedResponse(sessions, total, page || 1, take);
  }

  private calculateCharges(durationInMinutes: number): number {
    const ratePerHour = parseFloat(env.PARKING_RATE_PER_HOUR);
    const hours = Math.ceil(durationInMinutes / 60);
    return hours * ratePerHour;
  }
}
