import { Product } from "../models/product";
import { Store } from "../models/store";

export interface IStoreActions {
    getBySlug(slug: string): Promise<Store>;
    getById(id: string): Promise<Store>;
    getProducts(slug: string): Promise<Product[]>;
}

export type SearchStoreParams = {
    id?: string;
    slug?: string;
};

export type SearchStoreProductsParams = {
    storeId: string;
};
export interface IStoreRepository {
    search(params: SearchStoreParams): Promise<Store[]>;
    getProducts(params: SearchStoreProductsParams): Promise<Product[]>;
}
