"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MallService = void 0;
const repository_1 = require("./repository");
const pagination_1 = require("../../../utils/pagination");
class MallService {
    repository;
    constructor() {
        this.repository = new repository_1.MallRepository();
    }
    async getMalls(city, page, limit) {
        const { skip, take } = (0, pagination_1.getPaginationParams)(page, limit);
        const { malls, total } = await this.repository.findMalls(city, skip, take);
        return (0, pagination_1.createPaginatedResponse)(malls, total, page || 1, take);
    }
    async getMallById(id) {
        const mall = await this.repository.findById(id);
        if (!mall) {
            throw new Error('Mall not found');
        }
        return mall;
    }
    async getFloorsByMallId(mallId) {
        const mall = await this.repository.findById(mallId);
        if (!mall) {
            throw new Error('Mall not found');
        }
        return await this.repository.findFloorsByMallId(mallId);
    }
    async getStoresByMallId(mallId, floorId) {
        const mall = await this.repository.findById(mallId);
        if (!mall) {
            throw new Error('Mall not found');
        }
        return await this.repository.findStoresByMallId(mallId, floorId);
    }
    async searchStores(mallId, query) {
        if (!query || query.trim().length < 2) {
            throw new Error('Search query must be at least 2 characters');
        }
        return await this.repository.searchStores(mallId, query.trim());
    }
    async getStoreById(id) {
        const store = await this.repository.findStoreById(id);
        if (!store) {
            throw new Error('Store not found');
        }
        return store;
    }
}
exports.MallService = MallService;
//# sourceMappingURL=service.js.map