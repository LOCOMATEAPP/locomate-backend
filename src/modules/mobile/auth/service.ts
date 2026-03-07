import { AuthRepository } from './repository';
import { generateOTP, storeOTP, verifyOTP } from '../../../utils/otp';
import {
  generateMobileAccessToken,
  generateMobileRefreshToken,
  verifyMobileRefreshToken,
} from '../../../utils/jwt';
import { logger } from '../../../config/logger';

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async checkUserExists(phone: string): Promise<{ exists: boolean; user?: any }> {
    const user = await this.repository.findUserByPhone(phone);
    
    if (user) {
      return {
        exists: true,
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      };
    }
    
    return { exists: false };
  }

  async sendOTP(phone: string): Promise<{ message: string; otp?: string }> {
    const otp = generateOTP();
    await storeOTP(phone, otp);

    logger.info({ phone }, 'OTP generated');

    // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
    // For development, return OTP in response
    if (process.env.NODE_ENV === 'development') {
      return { message: 'OTP sent successfully', otp };
    }

    return { message: 'OTP sent successfully' };
  }

  async signup(data: {
    phone: string;
    name: string;
    avatar?: string;
    gender?: string;
    dob?: string;
  }): Promise<{
    user: any;
  }> {
    const existingUser = await this.repository.findUserByPhone(data.phone);

    if (existingUser) {
      throw new Error('User already exists. Please login instead.');
    }

    const user = await this.repository.createUserWithDetails({
      phone: data.phone,
      name: data.name,
      avatar: data.avatar,
      gender: data.gender,
      dob: data.dob,
    });

    logger.info({ userId: user.id, phone: user.phone }, 'User created successfully');

    return {
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        gender: user.gender,
        dob: user.dob,
      },
    };
  }

  async verifyOTPAndLogin(phone: string, otp: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: any;
  }> {
    const isValid = await verifyOTP(phone, otp);

    if (!isValid) {
      throw new Error('Invalid or expired OTP');
    }

    const user = await this.repository.findUserByPhone(phone);

    if (!user) {
      throw new Error('User not found. Please signup first.');
    }

    if (!user.isActive) {
      throw new Error('User account is blocked');
    }

    const accessToken = generateMobileAccessToken({
      userId: user.id,
      phone: user.phone,
      type: 'mobile',
    });

    const refreshToken = generateMobileRefreshToken({
      userId: user.id,
      phone: user.phone,
      type: 'mobile',
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.repository.saveRefreshToken(user.id, refreshToken, expiresAt);

    logger.info({ userId: user.id, phone }, 'User logged in successfully');

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const payload = verifyMobileRefreshToken(refreshToken);

      const tokenRecord = await this.repository.findRefreshToken(refreshToken);

      if (!tokenRecord) {
        throw new Error('Invalid refresh token');
      }

      if (tokenRecord.expiresAt < new Date()) {
        await this.repository.deleteRefreshToken(refreshToken);
        throw new Error('Refresh token expired');
      }

      const user = await this.repository.findUserByPhone(payload.phone);

      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      await this.repository.deleteRefreshToken(refreshToken);

      const newAccessToken = generateMobileAccessToken({
        userId: user.id,
        phone: user.phone,
        type: 'mobile',
      });

      const newRefreshToken = generateMobileRefreshToken({
        userId: user.id,
        phone: user.phone,
        type: 'mobile',
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await this.repository.saveRefreshToken(user.id, newRefreshToken, expiresAt);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async logout(userId: string, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      await this.repository.deleteRefreshToken(refreshToken);
    } else {
      await this.repository.deleteUserRefreshTokens(userId);
    }
  }
}
