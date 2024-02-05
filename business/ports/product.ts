import { Product } from "../models/product";

export interface IProductActions {
    getBySlug(slug: string): Promise<Product>;
    getById(id: string): Promise<Product>;
}

export type SearchProductParams = {
    id?: string;
    slug?: string;
};
export interface IProductRepository {
    search(params: SearchProductParams): Promise<Product[]>;
}
