import { Product } from "../models/product";
import { Store } from "../models/store";

export interface IStoreActions {
    getStore(slug: string): Promise<Store>;
    getStoreProducts(slug: string): Promise<Product[]>;
}

export type SearchStoreParams = {
    id: string;
};

export type SearchStoreProductsParams = {
    id: string;
};
export interface IStoreRepository {
    searchStore(params: SearchStoreParams): Promise<Store>;
    getStoreProducts(params: SearchStoreProductsParams): Promise<Product[]>;
}
