import { Product } from "../models/product";
import { IProductActions, IProductRepository } from "../ports/product";

export class ProductBusiness implements IProductActions {
    constructor(private repository: IProductRepository) {}
    getBySlug(param: { slug: string; storeId: string }): Promise<Product> {
        return this.repository
            .search({
                storeId: param.storeId,
                slug: param.slug,
            })
            .then((data) => {
                if (data.length > 0) {
                    return data[0];
                }

                throw new Error("Produit inexistant");
            });
    }
    getById(params: { id: string; storeId: string }): Promise<Product> {
        return this.repository
            .search({
                storeId: params.storeId,
                id: params.id,
            })
            .then((data) => {
                if (data.length > 0) {
                    return data[0];
                }

                throw new Error("Produit inexistant");
            });
    }
}
