import { SavedItem } from '@prisma/client';
export declare class SavedRepository {
    saveStore(userId: string, storeId: string): Promise<SavedItem>;
    saveOffer(userId: string, offerId: string): Promise<SavedItem>;
    removeSaved(id: string, userId: string): Promise<void>;
    findSavedItems(userId: string, itemType?: string): Promise<({
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
    checkExists(userId: string, itemType: string, storeId?: string, offerId?: string): Promise<boolean>;
}
//# sourceMappingURL=repository.d.ts.map