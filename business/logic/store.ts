import { Product } from "../models/product";
import { Store } from "../models/store";
import { IProductRepository } from "../ports/product";
import { IStoreActions, IStoreRepository } from "../ports/store";

export class StoreBusiness implements IStoreActions {
    constructor(
        private repository: IStoreRepository,
        private productRepo: IProductRepository
    ) {}
    getBestProducts(storeId: string, count: number): Promise<Product[]> {
        return this.productRepo
            .getBestProducts({
                storeId,
                count,
            })
            .then((data) => {
                return data;
            });
    }
    getBySlug(slug: string): Promise<Store> {
        return this.repository
            .search({
                slug,
            })
            .then((data) => {
                if (data.length > 0) {
                    return data[0];
                }

                throw new Error("Boutique inexistante");
            });
    }
    getById(id: string): Promise<Store> {
        return this.repository
            .search({
                id,
            })
            .then((data) => {
                if (data.length > 0) {
                    return data[0];
                }

                throw new Error("Boutique inexistante");
            });
    }
    getProducts(id: string): Promise<Product[]> {
        return this.productRepo.search({
            storeId: id,
        });
    }
}
