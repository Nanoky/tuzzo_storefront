import { Instances } from "@/init";
import { SerializeProduct } from "../models/product";

export function useProducts() {
    const getProductById = async (storeId: string, id: string) => {
        return Instances.getProductInstance()
            .getById({
                id: id,
                storeId: storeId,
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
    };

    return {
        getProductById,
    };
}
