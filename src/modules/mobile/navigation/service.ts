import { NavigationRepository } from './repository';
import { CalculateRouteInput } from './schema';
import { calculateNavigation } from '../../../utils/navigation';
import { getPaginationParams, createPaginatedResponse } from '../../../utils/pagination';

export class NavigationService {
  private repository: NavigationRepository;

  constructor() {
    this.repository = new NavigationRepository();
  }

  async calculateRoute(userId: string, data: CalculateRouteInput) {
    const { startX, startY, targetStoreId, mallId } = data;

    const targetStore = await this.repository.findStoreById(targetStoreId);

    if (!targetStore || targetStore.mallId !== mallId) {
      throw new Error('Store not found in the specified mall');
    }

    const stores = await this.repository.findStoresByMallId(mallId);

    const result = calculateNavigation(startX, startY, stores, targetStoreId);

    if (!result) {
      throw new Error('Unable to calculate route');
    }

    await this.repository.saveRouteHistory(userId, targetStoreId, result.distance, result.duration);

    return result;
  }

  async getHistory(userId: string, page?: number, limit?: number) {
    const { skip, take } = getPaginationParams(page, limit);
    const { history, total } = await this.repository.findHistory(userId, skip, take);

    return createPaginatedResponse(history, total, page || 1, take);
  }
}
