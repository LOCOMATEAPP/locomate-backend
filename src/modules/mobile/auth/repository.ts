import { prisma } from '../../../config/database';
import { User, RefreshToken } from '@prisma/client';

export class AuthRepository {
  async findUserByPhone(phone: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { phone },
    });
  }

  async createUser(phone: string): Promise<User> {
    return await prisma.user.create({
      data: { phone },
    });
  }

  async createUserWithDetails(data: {
    phone: string;
    name: string;
    avatar?: string;
    gender?: string;
    dob?: string;
  }): Promise<User> {
    return await prisma.user.create({
      data: {
        phone: data.phone,
        name: data.name,
        avatar: data.avatar,
        gender: data.gender,
        dob: data.dob ? new Date(data.dob) : undefined,
      },
    });
  }

  async saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    return await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: { token },
    });
  }

  async deleteUserRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async cleanExpiredTokens(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
