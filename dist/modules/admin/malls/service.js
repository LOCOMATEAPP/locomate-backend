"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMallService = void 0;
const repository_1 = require("./repository");
class AdminMallService {
    repository;
    constructor() {
        this.repository = new repository_1.AdminMallRepository();
    }
    async createMall(data) {
        const mall = await this.repository.createMall(data);
        return {
            id: mall.id,
            name: mall.name,
            address: mall.address,
            city: mall.city,
            state: mall.state,
            zipCode: mall.zipCode,
            latitude: mall.latitude,
            longitude: mall.longitude,
            description: mall.description,
            image: mall.image,
            isActive: mall.isActive,
            createdAt: mall.createdAt,
            updatedAt: mall.updatedAt,
        };
    }
    async updateMall(id, data) {
        const existingMall = await this.repository.findById(id);
        if (!existingMall) {
            throw new Error('Mall not found');
        }
        const mall = await this.repository.updateMall(id, data);
        return {
            id: mall.id,
            name: mall.name,
            address: mall.address,
            city: mall.city,
            state: mall.state,
            zipCode: mall.zipCode,
            latitude: mall.latitude,
            longitude: mall.longitude,
            description: mall.description,
            image: mall.image,
            isActive: mall.isActive,
            createdAt: mall.createdAt,
            updatedAt: mall.updatedAt,
        };
    }
    async deleteMall(id) {
        const existingMall = await this.repository.findById(id);
        if (!existingMall) {
            throw new Error('Mall not found');
        }
        await this.repository.deleteMall(id);
        return { message: 'Mall deleted successfully' };
    }
    async getMalls(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const { malls, total } = await this.repository.findMalls(skip, limit);
        return {
            malls: malls.map(mall => ({
                id: mall.id,
                name: mall.name,
                address: mall.address,
                city: mall.city,
                state: mall.state,
                zipCode: mall.zipCode,
                latitude: mall.latitude,
                longitude: mall.longitude,
                description: mall.description,
                image: mall.image,
                isActive: mall.isActive,
                createdAt: mall.createdAt,
                updatedAt: mall.updatedAt,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getMallById(id) {
        const mall = await this.repository.findById(id);
        if (!mall) {
            throw new Error('Mall not found');
        }
        const floors = await this.repository.findFloors(id);
        return {
            id: mall.id,
            name: mall.name,
            address: mall.address,
            city: mall.city,
            state: mall.state,
            zipCode: mall.zipCode,
            latitude: mall.latitude,
            longitude: mall.longitude,
            description: mall.description,
            image: mall.image,
            isActive: mall.isActive,
            createdAt: mall.createdAt,
            updatedAt: mall.updatedAt,
            floors: floors.map(floor => ({
                id: floor.id,
                name: floor.name,
                floorNumber: floor.floorNumber,
                mapImage: floor.mapImage,
                isActive: floor.isActive,
            })),
        };
    }
    async createFloor(data) {
        const mall = await this.repository.findById(data.mallId);
        if (!mall) {
            throw new Error('Mall not found');
        }
        const floor = await this.repository.createFloor(data);
        return {
            id: floor.id,
            mallId: floor.mallId,
            name: floor.name,
            floorNumber: floor.floorNumber,
            mapImage: floor.mapImage,
            isActive: floor.isActive,
            createdAt: floor.createdAt,
            updatedAt: floor.updatedAt,
        };
    }
    async updateFloor(id, data) {
        const floor = await this.repository.updateFloor(id, data);
        return {
            id: floor.id,
            mallId: floor.mallId,
            name: floor.name,
            floorNumber: floor.floorNumber,
            mapImage: floor.mapImage,
            isActive: floor.isActive,
            createdAt: floor.createdAt,
            updatedAt: floor.updatedAt,
        };
    }
    async deleteFloor(id) {
        await this.repository.deleteFloor(id);
        return { message: 'Floor deleted successfully' };
    }
    async getFloors(mallId) {
        const mall = await this.repository.findById(mallId);
        if (!mall) {
            throw new Error('Mall not found');
        }
        const floors = await this.repository.findFloors(mallId);
        return floors.map(floor => ({
            id: floor.id,
            mallId: floor.mallId,
            name: floor.name,
            floorNumber: floor.floorNumber,
            mapImage: floor.mapImage,
            isActive: floor.isActive,
            createdAt: floor.createdAt,
            updatedAt: floor.updatedAt,
        }));
    }
}
exports.AdminMallService = AdminMallService;
//# sourceMappingURL=service.js.map