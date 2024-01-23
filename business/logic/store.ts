import { Product } from "../models/product";
import { Store } from "../models/store";
import { IStoreActions, IStoreRepository } from "../ports/store";

export class StoreBusiness implements IStoreActions {
    constructor(private repository: IStoreRepository) {}
    getStore(slug: string): Promise<Store> {
        return this.repository.searchStore({
            id: slug,
        });
    }
    getStoreProducts(slug: string): Promise<Product[]> {
        return this.repository.getStoreProducts({
            id: slug,
        });
    }
}
