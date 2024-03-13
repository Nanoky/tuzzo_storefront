import { Product } from "../models/product";
import { Store } from "../models/store";

export interface IStoreActions {
    getBySlug(slug: string): Promise<Store>;
    getById(id: string): Promise<Store>;
    getProducts(slug: string): Promise<Product[]>;
    getBestProducts(storeId: string, count: number): Promise<Product[]>;
}

export type SearchStoreParams = {
    id?: string;
    slug?: string;
};
    
export interface IStoreRepository {
    search(params: SearchStoreParams): Promise<Store[]>;
}
