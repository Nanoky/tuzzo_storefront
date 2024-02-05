import { IStoreActions } from "@/business/ports/store";

export class StoreAdapter {
    constructor(private business: IStoreActions) {}

    getById(id: string) {
        return this.business.getById(id);
    }

    getBySlug(slug: string) {
        return this.business.getBySlug(slug);
    }

    getProducts(id: string) {
        return this.business.getProducts(id);
    }
}
