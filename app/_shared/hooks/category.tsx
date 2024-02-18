import { getAllCategories } from "../services/category";

export function useCategories() {
    const getCategories = async (storeId: string) => {
        return getAllCategories({
            storeId: storeId,
        }).catch((err) => {
            //redirect(createNotFoundRoute());
            console.error(err);
        });
    };
    return {
        getCategories,
    };
}
