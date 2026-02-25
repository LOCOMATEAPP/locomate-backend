import { MallRepository } from './repository';
import { getPaginationParams, createPaginatedResponse } from '../../../utils/pagination';

export class MallService {
  private repository: MallRepository;

  constructor() {
    this.repository = new MallRepository();
  }

  async getMalls(city?: string, page?: number, limit?: number) {
    const { skip, take } = getPaginationParams(page, limit);
    const { malls, total } = await this.repository.findMalls(city, skip, take);

    return createPaginatedResponse(malls, total, page || 1, take);
  }

  async getMallById(id: string) {
    const mall = await this.repository.findById(id);

    if (!mall) {
      throw new Error('Mall not found');
    }

    return mall;
  }

  async getFloorsByMallId(mallId: string) {
    const mall = await this.repository.findById(mallId);

    if (!mall) {
      throw new Error('Mall not found');
    }

    return await this.repository.findFloorsByMallId(mallId);
  }

  async getStoresByMallId(mallId: string, floorId?: string) {
    const mall = await this.repository.findById(mallId);

    if (!mall) {
      throw new Error('Mall not found');
    }

    return await this.repository.findStoresByMallId(mallId, floorId);
  }

  async searchStores(mallId: string, query: string) {
    if (!query || query.trim().length < 2) {
      throw new Error('Search query must be at least 2 characters');
    }

    return await this.repository.searchStores(mallId, query.trim());
  }

  async getStoreById(id: string) {
    const store = await this.repository.findStoreById(id);

    if (!store) {
      throw new Error('Store not found');
    }

    return store;
  }
}
