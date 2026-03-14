import { AdminRefreshToken } from '@prisma/client';
export declare class AdminAuthRepository {
    findByEmail(email: string): Promise<({
        role: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
    } & {
        name: string;
        id: string;
        email: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        roleId: string;
    }) | null>;
    saveRefreshToken(adminId: string, token: string, expiresAt: Date): Promise<AdminRefreshToken>;
    findRefreshToken(token: string): Promise<AdminRefreshToken | null>;
    deleteRefreshToken(token: string): Promise<void>;
    deleteAdminRefreshTokens(adminId: string): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map