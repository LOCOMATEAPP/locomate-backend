export declare class AuthService {
    private repository;
    constructor();
    checkUserExists(phone: string): Promise<{
        exists: boolean;
        user?: any;
    }>;
    sendOTP(phone: string): Promise<{
        message: string;
        otp?: string;
    }>;
    signup(data: {
        phone: string;
        name: string;
        avatar?: string;
        gender?: string;
        dob?: string;
    }): Promise<{
        user: any;
    }>;
    verifyOTPAndLogin(phone: string, otp: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, refreshToken?: string): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map