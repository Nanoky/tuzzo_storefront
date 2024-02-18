import { Category } from "../models/category";

export interface ICategoryActions {
    getById(param: { id: string, storeId: string }): Promise<Category>;
}

export type SearchCategoryParams = {
    id?: string;
    name?: string;
    storeId: string;
};

export interface ICategoryRepository {
    search(params: SearchCategoryParams): Promise<Category[]>;
}
