import { redirect } from "next/navigation";
import { SerializeProduct } from "../models/product";
import { Instances } from "@/init";
import { searchStoreById, searchStoreBySlug } from "../services/store";

export function useShop() {
    const getStoreBySlug = async (slug: string) => {
        return searchStoreBySlug({ slug }).catch((err) => {
            //redirect("/404");
            console.error(err);
        });
    };

    const getStoreById = async (id: string) => {
        return searchStoreById({ id }).catch((err) => {
            //redirect("/404");
            console.error(err);
        });
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
