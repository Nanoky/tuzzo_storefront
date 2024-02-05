import { IProductActions } from "@/business/ports/product";

export class ProductAdapter {
    constructor(private business: IProductActions) {}

    getById(param: { id: string; storeId: string }) {
        return this.business.getById(param);
    }

    getBySlug(param: { slug: string; storeId: string }) {
        return this.business.getBySlug(param);
    }
}
