import { Instances } from "@/init";

export function searchStoreBySlug(param: { slug: string }) {
    return Instances.getStoreInstance().getBySlug(param.slug);
}

export function searchStoreById(param: { id: string }) {
    return Instances.getStoreInstance().getById(param.id);
}

export function searchStoreProducts(param: { storeId: string }) {
    return Instances.getStoreInstance().getProducts(param.storeId);
}

export function searchBestProducts(param: { storeId: string; count: number }) {
    return Instances.getStoreInstance().getBestProducts(param.storeId, param.count);
}
