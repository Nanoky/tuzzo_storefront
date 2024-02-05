import { SerializeProduct } from "../models/product";
import { Instances } from "@/init";

export function useShop() {
    const getStoreBySlug = async (slug: string) => {
        return Instances.getStoreInstance().getBySlug(slug);
    };

    const getStoreById = async (id: string) => {
        return Instances.getStoreInstance().getById(id);
    };

    const getProducts = async (storeId: string) => {
        return Instances.getStoreInstance()
            .getProducts(storeId)
            .then((products) => {
                return products.map((product) => {
                    return new SerializeProduct({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        currency: product.currency,
                        images: product.images,
                        quantity: product.quantity,
                        nbSold: product.nbSold,
                        categories: product.categories,
                        slug: product.slug,
                    });
                });
            });
    };

    return {
        getStoreById,
        getStoreBySlug,
        getProducts,
    };
}
