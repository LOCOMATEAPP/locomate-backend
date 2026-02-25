import { UserRepository } from './repository';
import { UpdateProfileInput } from './schema';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getProfile(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, data: UpdateProfileInput) {
    const user = await this.repository.updateProfile(userId, data);

    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}
