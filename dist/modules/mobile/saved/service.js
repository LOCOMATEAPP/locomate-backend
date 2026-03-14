"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedService = void 0;
const repository_1 = require("./repository");
class SavedService {
    repository;
    constructor() {
        this.repository = new repository_1.SavedRepository();
    }
    async saveStore(userId, storeId) {
        const exists = await this.repository.checkExists(userId, 'store', storeId);
        if (exists) {
            throw new Error('Store already saved');
        }
        return await this.repository.saveStore(userId, storeId);
    }
    async saveOffer(userId, offerId) {
        const exists = await this.repository.checkExists(userId, 'offer', undefined, offerId);
        if (exists) {
            throw new Error('Offer already saved');
        }
        return await this.repository.saveOffer(userId, offerId);
    }
    async removeSaved(id, userId) {
        await this.repository.removeSaved(id, userId);
    }
    async getSavedItems(userId, itemType) {
        return await this.repository.findSavedItems(userId, itemType);
    }
}
exports.SavedService = SavedService;
//# sourceMappingURL=service.js.map