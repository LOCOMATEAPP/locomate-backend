import { User } from '@prisma/client';
export declare class UserRepository {
    findById(id: string): Promise<User | null>;
    updateProfile(id: string, data: Partial<User>): Promise<User>;
}
//# sourceMappingURL=repository.d.ts.map