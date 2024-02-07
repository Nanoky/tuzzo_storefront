import { Product } from "../models/product";

export interface IProductActions {
    getBySlug(param: { slug: string; storeId: string }): Promise<Product>;
    getById(param: { id: string; storeId: string }): Promise<Product>;
}

export type SearchProductParams = {
    storeId: string;
    id?: string;
    slug?: string;
};
export interface IProductRepository {
    search(params: SearchProductParams): Promise<Product[]>;
    update(param: { product: Product; storeId: string }): Promise<Product | null>;
}
