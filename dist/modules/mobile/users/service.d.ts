import { UpdateProfileInput } from './schema';
export declare class UserService {
    private repository;
    constructor();
    getProfile(userId: string): Promise<{
        id: string;
        phone: string;
        name: string | null;
        email: string | null;
        avatar: string | null;
        createdAt: Date;
    }>;
    updateProfile(userId: string, data: UpdateProfileInput): Promise<{
        id: string;
        phone: string;
        name: string | null;
        email: string | null;
        avatar: string | null;
    }>;
}
//# sourceMappingURL=service.d.ts.map