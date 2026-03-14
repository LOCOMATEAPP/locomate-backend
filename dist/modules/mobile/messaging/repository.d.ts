import { MessageRead } from '@prisma/client';
export declare class MessagingRepository {
    findMessages(skip?: number, take?: number): Promise<{
        messages: ({
            store: {
                name: string;
                id: string;
                logo: string | null;
            } | null;
            mall: {
                name: string;
                id: string;
            } | null;
        } & {
            body: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            mallId: string | null;
            storeId: string | null;
            title: string;
            targetType: string;
            scheduledAt: Date | null;
            sentAt: Date | null;
        })[];
        total: number;
    }>;
    markAsRead(userId: string, messageId: string): Promise<MessageRead>;
    checkIfRead(userId: string, messageId: string): Promise<boolean>;
}
//# sourceMappingURL=repository.d.ts.map