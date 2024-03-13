import { Product } from "@/business/models/product";
import { getAllCategories, getCategoryProducts } from "../services/category";
import { Category } from "@/business/models/category";
import { SerializeCategory } from "../models/category";

export function useCategories() {
    const getCategories = async (storeId: string) => {
        return getAllCategories({
            storeId: storeId,
        }).then((categories) => categories.map((category) => new SerializeCategory(category))).catch((err) => {
            //redirect(createNotFoundRoute());
            console.error(err);
            return new Array<Category>();
        });
    };

    const getProducts = async (param: { id: string; storeId: string }) => {
        return getCategoryProducts(param).catch((err) => {
            //redirect(createNotFoundRoute());
            console.error(err);
            return new Array<Product>();
        });
    };

    return {
        getCategories,
        getProducts,
    };
}
