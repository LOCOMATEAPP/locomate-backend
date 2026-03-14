"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationService = void 0;
const repository_1 = require("./repository");
const navigation_1 = require("../../../utils/navigation");
const pagination_1 = require("../../../utils/pagination");
class NavigationService {
    repository;
    constructor() {
        this.repository = new repository_1.NavigationRepository();
    }
    async calculateRoute(userId, data) {
        const { startX, startY, targetStoreId, mallId } = data;
        const targetStore = await this.repository.findStoreById(targetStoreId);
        if (!targetStore || targetStore.mallId !== mallId) {
            throw new Error('Store not found in the specified mall');
        }
        const stores = await this.repository.findStoresByMallId(mallId);
        const result = (0, navigation_1.calculateNavigation)(startX, startY, stores, targetStoreId);
        if (!result) {
            throw new Error('Unable to calculate route');
        }
        await this.repository.saveRouteHistory(userId, targetStoreId, result.distance, result.duration);
        return result;
    }
    async getHistory(userId, page, limit) {
        const { skip, take } = (0, pagination_1.getPaginationParams)(page, limit);
        const { history, total } = await this.repository.findHistory(userId, skip, take);
        return (0, pagination_1.createPaginatedResponse)(history, total, page || 1, take);
    }
}
exports.NavigationService = NavigationService;
//# sourceMappingURL=service.js.map