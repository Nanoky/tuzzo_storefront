import { Instances } from "@/init";
import { SerializeProduct } from "../models/product";

export function searchProductById(param: { id: string; storeId: string }) {
    return Instances.getProductInstance()
        .getById({
            id: param.id,
            storeId: param.storeId,
        })
        .then((product) => {
            return new SerializeProduct({
                currency: product.currency,
                description: product.description,
                id: product.id,
                images: product.images,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                nbSold: product.nbSold,
                categories: product.categories,
                slug: product.slug,
            });
        });
}

export function searchProductBySlug(param: { slug: string; storeId: string }) {
    return Instances.getProductInstance()
        .getBySlug({
            slug: param.slug,
            storeId: param.storeId,
        })
        .then((product) => {
            return new SerializeProduct({
                currency: product.currency,
                description: product.description,
                id: product.id,
                images: product.images,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                nbSold: product.nbSold,
                categories: product.categories,
                slug: product.slug,
            });
        });
}
