import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './service';
import { sendOTPSchema, checkUserSchema, verifyOTPSchema, signupSchema, refreshTokenSchema } from './schema';
import { sendSuccess, sendError } from '../../../utils/response';
import { AuthenticatedRequest, MobileAuthPayload } from '../../../types';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  checkUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { phone } = checkUserSchema.parse(request.body);
      const result = await this.service.checkUserExists(phone);
      sendSuccess(reply, result, 'User check completed');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to check user', 400);
    }
  };

  sendOTP = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { phone } = sendOTPSchema.parse(request.body);
      const result = await this.service.sendOTP(phone);
      sendSuccess(reply, result, 'OTP sent successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Failed to send OTP', 400);
    }
  };

  signup = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const data = signupSchema.parse(request.body);
      const result = await this.service.signup(data);
      sendSuccess(reply, result, 'Signup successful', 201);
    } catch (error: any) {
      sendError(reply, error.message, 'Signup failed', 400);
    }
  };

  verifyOTP = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { phone, otp } = verifyOTPSchema.parse(request.body);
      const result = await this.service.verifyOTPAndLogin(phone, otp);
      sendSuccess(reply, result, 'Login successful');
    } catch (error: any) {
      sendError(reply, error.message, 'Login failed', 401);
    }
  };

  refreshToken = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const { refreshToken } = refreshTokenSchema.parse(request.body);
      const result = await this.service.refreshAccessToken(refreshToken);
      sendSuccess(reply, result, 'Token refreshed successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Token refresh failed', 401);
    }
  };

  logout = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const user = (request as AuthenticatedRequest).user as MobileAuthPayload;
      const { refreshToken } = request.body as { refreshToken?: string };
      
      await this.service.logout(user.userId, refreshToken);
      sendSuccess(reply, null, 'Logged out successfully');
    } catch (error: any) {
      sendError(reply, error.message, 'Logout failed', 400);
    }
  };
}
