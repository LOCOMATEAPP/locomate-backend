"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
const repository_1 = require("./repository");
const env_1 = require("../../../config/env");
const pagination_1 = require("../../../utils/pagination");
class ParkingService {
    repository;
    constructor() {
        this.repository = new repository_1.ParkingRepository();
    }
    async startParking(userId, location) {
        const activeSession = await this.repository.findActiveSession(userId);
        if (activeSession) {
            throw new Error('You already have an active parking session');
        }
        return await this.repository.createSession(userId, location);
    }
    async getActiveSession(userId) {
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
    async endParking(userId) {
        const session = await this.repository.findActiveSession(userId);
        if (!session) {
            throw new Error('No active parking session found');
        }
        const duration = Math.floor((Date.now() - session.startTime.getTime()) / 1000 / 60);
        const charges = this.calculateCharges(duration);
        return await this.repository.endSession(session.id, duration, charges);
    }
    async getHistory(userId, page, limit) {
        const { skip, take } = (0, pagination_1.getPaginationParams)(page, limit);
        const { sessions, total } = await this.repository.findUserSessions(userId, skip, take);
        return (0, pagination_1.createPaginatedResponse)(sessions, total, page || 1, take);
    }
    calculateCharges(durationInMinutes) {
        const ratePerHour = parseFloat(env_1.env.PARKING_RATE_PER_HOUR);
        const hours = Math.ceil(durationInMinutes / 60);
        return hours * ratePerHour;
    }
}
exports.ParkingService = ParkingService;
//# sourceMappingURL=service.js.map