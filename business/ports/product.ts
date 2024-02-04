import { Product } from "../models/product";

export interface IProductActions {
    getProduct(slug: string): Promise<Product>;
}

export type SearchProductParams = {
    id: string;
};
export interface IProductRepository {
    searchProduct(params: SearchProductParams): Promise<Product>;
}
