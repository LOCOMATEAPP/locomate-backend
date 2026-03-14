"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStoreService = void 0;
const repository_1 = require("./repository");
class AdminStoreService {
    repository;
    constructor() {
        this.repository = new repository_1.AdminStoreRepository();
    }
    async createStore(data) {
        // Convert images array to JSON if provided
        const storeData = {
            ...data,
            images: data.images ? data.images : null,
        };
        const store = await this.repository.createStore(storeData);
        return this.formatStoreResponse(store);
    }
    async updateStore(id, data) {
        const existingStore = await this.repository.findById(id);
        if (!existingStore) {
            throw new Error('Store not found');
        }
        // Convert images array to JSON if provided
        const storeData = {
            ...data,
            images: data.images ? data.images : undefined,
        };
        const store = await this.repository.updateStore(id, storeData);
        return this.formatStoreResponse(store);
    }
    async deleteStore(id) {
        const existingStore = await this.repository.findById(id);
        if (!existingStore) {
            throw new Error('Store not found');
        }
        await this.repository.deleteStore(id);
        return { message: 'Store deleted successfully' };
    }
    async getStores(mallId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const { stores, total } = await this.repository.findStores(mallId, skip, limit);
        return {
            stores: stores.map(store => this.formatStoreResponse(store)),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getStoreById(id) {
        const store = await this.repository.findById(id);
        if (!store) {
            throw new Error('Store not found');
        }
        return this.formatStoreResponse(store);
    }
    formatStoreResponse(store) {
        return {
            id: store.id,
            mallId: store.mallId,
            floorId: store.floorId,
            name: store.name,
            category: store.category,
            description: store.description,
            logo: store.logo,
            images: store.images,
            phone: store.phone,
            email: store.email,
            website: store.website,
            coordinateX: store.coordinateX,
            coordinateY: store.coordinateY,
            isActive: store.isActive,
            createdAt: store.createdAt,
            updatedAt: store.updatedAt,
            mall: store.mall ? {
                id: store.mall.id,
                name: store.mall.name,
                city: store.mall.city,
            } : undefined,
            floor: store.floor ? {
                id: store.floor.id,
                name: store.floor.name,
                floorNumber: store.floor.floorNumber,
            } : undefined,
        };
    }
}
exports.AdminStoreService = AdminStoreService;
//# sourceMappingURL=service.js.map