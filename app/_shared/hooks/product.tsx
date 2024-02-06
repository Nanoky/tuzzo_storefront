import { redirect } from "next/navigation";
import { searchProductById } from "../services/product";

export function useProducts() {
    const getProductById = async (storeId: string, id: string) => {
        return searchProductById({ id, storeId }).catch((err) => {
            redirect("/404");
        });
    };

    return {
        getProductById,
    };
}
