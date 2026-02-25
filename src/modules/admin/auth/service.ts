import { AdminAuthRepository } from './repository';
import { comparePassword } from '../../../utils/password';
import {
  generateAdminAccessToken,
  generateAdminRefreshToken,
  verifyAdminRefreshToken,
} from '../../../utils/jwt';
import { logger } from '../../../config/logger';

export class AdminAuthService {
  private repository: AdminAuthRepository;

  constructor() {
    this.repository = new AdminAuthRepository();
  }

  async login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    admin: any;
  }> {
    const admin = await this.repository.findByEmail(email);

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new Error('Account is inactive');
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateAdminAccessToken({
      adminId: admin.id,
      email: admin.email,
      roleId: admin.roleId,
      type: 'admin',
    });

    const refreshToken = generateAdminRefreshToken({
      adminId: admin.id,
      email: admin.email,
      roleId: admin.roleId,
      type: 'admin',
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.repository.saveRefreshToken(admin.id, refreshToken, expiresAt);

    logger.info({ adminId: admin.id, email: admin.email }, 'Admin logged in');

    return {
      accessToken,
      refreshToken,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role.name,
      },
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const payload = verifyAdminRefreshToken(refreshToken);

      const tokenRecord = await this.repository.findRefreshToken(refreshToken);

      if (!tokenRecord) {
        throw new Error('Invalid refresh token');
      }

      if (tokenRecord.expiresAt < new Date()) {
        await this.repository.deleteRefreshToken(refreshToken);
        throw new Error('Refresh token expired');
      }

      const admin = await this.repository.findByEmail(payload.email);

      if (!admin || !admin.isActive) {
        throw new Error('Admin not found or inactive');
      }

      await this.repository.deleteRefreshToken(refreshToken);

      const newAccessToken = generateAdminAccessToken({
        adminId: admin.id,
        email: admin.email,
        roleId: admin.roleId,
        type: 'admin',
      });

      const newRefreshToken = generateAdminRefreshToken({
        adminId: admin.id,
        email: admin.email,
        roleId: admin.roleId,
        type: 'admin',
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await this.repository.saveRefreshToken(admin.id, newRefreshToken, expiresAt);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async logout(adminId: string, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      await this.repository.deleteRefreshToken(refreshToken);
    } else {
      await this.repository.deleteAdminRefreshTokens(adminId);
    }
  }
}
