import { Category } from "../models/category";
import { Product } from "../models/product";

export interface ICategoryActions {
    getById(param: { id: string; storeId: string }): Promise<Category>;
    getAll(param: { storeId: string }): Promise<Category[]>;
    getProducts(param: { id: string; storeId: string }): Promise<Product[]>;
}

export type SearchCategoryParams = {
    id?: string;
    name?: string;
    storeId: string;
};

export interface ICategoryRepository {
    search(params: SearchCategoryParams): Promise<Category[]>;
    getProducts(param: { id: string; storeId: string }): Promise<Product[]>;
}
