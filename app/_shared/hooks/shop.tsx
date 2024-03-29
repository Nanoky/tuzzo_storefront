import { redirect } from "next/navigation";
import { SerializeProduct } from "../models/product";
import {
    searchBestProducts,
    searchStoreById,
    searchStoreBySlug,
    searchStoreProducts,
} from "../services/store";
import { SerializeStore } from "../models/store";

export function useShop() {
    const getStoreBySlug = async (slug: string) => {
        return searchStoreBySlug({ slug })
            .then(
                (store) =>
                    new SerializeStore({
                        id: store.id,
                        name: store.name,
                        slug: store.slug,
                        description: store.description,
                        logo: store.logo,
                    })
            )
            .catch((err) => {
                //redirect(createNotFoundRoute());
                console.error(err);
            });
    };

    const getStoreById = async (id: string) => {
        return searchStoreById({ id })
            .then(
                (store) =>
                    new SerializeStore({
                        id: store.id,
                        name: store.name,
                        slug: store.slug,
                        description: store.description,
                        logo: store.logo,
                    })
            )
            .catch((err) => {
                //redirect(createNotFoundRoute());
                console.error(err);
            });
    };

    const getProducts = async (storeId: string) => {
        return searchStoreProducts({ storeId }).then((products) => {
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

    const getBestProducts = async (storeId: string, count: number) => {
        return searchBestProducts({ storeId, count }).then((products) => {
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
        getBestProducts,
    };
}
