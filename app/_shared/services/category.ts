import { Instances } from "@/init";

export function getAllCategories(params: { storeId: string }) {
    return Instances.getCategoryInstance().getAll(params);
}

export function searchCategoryById(param: { id: string; storeId: string }) {
    return Instances.getCategoryInstance().getById(param);
}

export function getCategoryProducts(param: { id: string; storeId: string }) {
    return Instances.getCategoryInstance().getProducts(param);
}
