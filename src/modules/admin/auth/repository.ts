import { prisma } from '../../../config/database';
import { Admin, AdminRefreshToken } from '@prisma/client';

export class AdminAuthRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    return await prisma.admin.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }

  async saveRefreshToken(adminId: string, token: string, expiresAt: Date): Promise<AdminRefreshToken> {
    return await prisma.adminRefreshToken.create({
      data: {
        adminId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token: string): Promise<AdminRefreshToken | null> {
    return await prisma.adminRefreshToken.findUnique({
      where: { token },
      include: { admin: true },
    });
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await prisma.adminRefreshToken.delete({
      where: { token },
    });
  }

  async deleteAdminRefreshTokens(adminId: string): Promise<void> {
    await prisma.adminRefreshToken.deleteMany({
      where: { adminId },
    });
  }
}
