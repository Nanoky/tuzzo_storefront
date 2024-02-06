import { Instances } from "@/init";

export function searchStoreBySlug(param: { slug: string }) {
    return Instances.getStoreInstance().getBySlug(param.slug);
}

export function searchStoreById(param: { id: string }) {
    return Instances.getStoreInstance().getById(param.id);
}
