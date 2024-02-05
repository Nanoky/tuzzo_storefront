import { Product } from "../models/product";
import { IProductActions, IProductRepository } from "../ports/product";

export class ProductBusiness implements IProductActions {
    constructor(private repository: IProductRepository) {}
    getBySlug(slug: string): Promise<Product> {
        return this.repository
            .search({
                slug,
            })
            .then((data) => {
                if (data.length > 0) {
                    return data[0];
                }

                throw new Error("Produit inexistant");
            });
    }
    getById(id: string): Promise<Product> {
        return this.repository
            .search({
                id,
            })
            .then((data) => {
                if (data.length > 0) {
                    return data[0];
                }

                throw new Error("Produit inexistant");
            });
    }
}
