export declare class SavedService {
    private repository;
    constructor();
    saveStore(userId: string, storeId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        storeId: string | null;
        offerId: string | null;
        itemType: string;
    }>;
    saveOffer(userId: string, offerId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        storeId: string | null;
        offerId: string | null;
        itemType: string;
    }>;
    removeSaved(id: string, userId: string): Promise<void>;
    getSavedItems(userId: string, itemType?: string): Promise<({
        store: {
            name: string;
            id: string;
            category: string;
            logo: string | null;
        } | null;
        offer: {
            id: string;
            image: string | null;
            title: string;
            discount: string;
            endDate: Date;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        storeId: string | null;
        offerId: string | null;
        itemType: string;
    })[]>;
}
//# sourceMappingURL=service.d.ts.map