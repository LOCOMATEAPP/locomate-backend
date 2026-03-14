export declare class AdminAuthService {
    private repository;
    constructor();
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: any;
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(adminId: string, refreshToken?: string): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map