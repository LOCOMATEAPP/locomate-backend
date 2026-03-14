export declare class MessagingService {
    private repository;
    constructor();
    getMessages(userId: string, page?: number, limit?: number): Promise<import("../../../types").PaginatedResponse<{
        isRead: boolean;
        store: {
            name: string;
            id: string;
            logo: string | null;
        } | null;
        mall: {
            name: string;
            id: string;
        } | null;
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
    }>>;
    markAsRead(userId: string, messageId: string): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map