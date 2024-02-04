import { Product } from "../models/product";
import { IProductActions, IProductRepository } from "../ports/product";

export class ProductBusiness implements IProductActions {
    constructor(private repository: IProductRepository) {}
    getProduct(slug: string): Promise<Product> {
        return this.repository.searchProduct({
            id: slug,
        });
    }
}
