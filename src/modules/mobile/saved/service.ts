import { SavedRepository } from './repository';

export class SavedService {
  private repository: SavedRepository;

  constructor() {
    this.repository = new SavedRepository();
  }

  async saveStore(userId: string, storeId: string) {
    const exists = await this.repository.checkExists(userId, 'store', storeId);
    if (exists) {
      throw new Error('Store already saved');
    }

    return await this.repository.saveStore(userId, storeId);
  }

  async saveOffer(userId: string, offerId: string) {
    const exists = await this.repository.checkExists(userId, 'offer', undefined, offerId);
    if (exists) {
      throw new Error('Offer already saved');
    }

    return await this.repository.saveOffer(userId, offerId);
  }

  async removeSaved(id: string, userId: string) {
    await this.repository.removeSaved(id, userId);
  }

  async getSavedItems(userId: string, itemType?: string) {
    return await this.repository.findSavedItems(userId, itemType);
  }
}
