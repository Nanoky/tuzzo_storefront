import { redirect } from "next/navigation";
import { searchProductById, searchProductBySlug } from "../services/product";

export function useProducts() {
    const getProductById = async (storeId: string, id: string) => {
        return searchProductById({ id, storeId }).catch((err) => {
            //redirect("/404");
            console.error(err);
        });
    };

    const getProductBySlug = async (storeId: string, slug: string) => {
        return searchProductBySlug({ slug: slug, storeId }).catch((err) => {
            //redirect("/404");
            console.error(err);
        });
    };

    return {
        getProductById,
        getProductBySlug,
    };
}
