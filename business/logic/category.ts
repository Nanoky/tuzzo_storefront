import { Category } from "../models/category";
import { Product } from "../models/product";
import { ICategoryActions, ICategoryRepository } from "../ports/category";

export class CategoryBusiness implements ICategoryActions {
    constructor(private repository: ICategoryRepository) {}
    getProducts(param: { id: string; storeId: string }): Promise<Product[]> {
        return this.repository
            .getProducts({
                id: param.id,
                storeId: param.storeId,
            })
            .then((data) => {
                if (data) {
                    return data;
                }
                throw new Error("Catégorie introuvable");
            });
    }
    getById(param: { id: string; storeId: string }): Promise<Category> {
        return this.repository
            .search({
                id: param.id,
                storeId: param.storeId,
            })
            .then((data) => {
                if (data && data.length > 0) {
                    return data[0];
                }
                throw new Error("Catégorie introuvable");
            });
    }

    getAll(param: { storeId: string }): Promise<Category[]> {
        return this.repository
            .search({
                storeId: param.storeId,
            })
            .then((data) => {
                if (data && data.length > 0) {
                    return data;
                }
                throw new Error("Catégorie introuvable");
            });
    }
}
