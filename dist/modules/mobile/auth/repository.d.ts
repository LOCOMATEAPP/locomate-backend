import { User, RefreshToken } from '@prisma/client';
export declare class AuthRepository {
    findUserByPhone(phone: string): Promise<User | null>;
    createUser(phone: string): Promise<User>;
    createUserWithDetails(data: {
        phone: string;
        name: string;
        avatar?: string;
        gender?: string;
        dob?: string;
    }): Promise<User>;
    saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<RefreshToken>;
    findRefreshToken(token: string): Promise<RefreshToken | null>;
    deleteRefreshToken(token: string): Promise<void>;
    deleteUserRefreshTokens(userId: string): Promise<void>;
    cleanExpiredTokens(): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map