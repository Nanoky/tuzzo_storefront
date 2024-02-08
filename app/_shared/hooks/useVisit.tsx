import { saveVisit } from "../services/visit";

export function useVisit() {
    const save = (storeId: string, page: string, productId?: string) => {
        return saveVisit(storeId, page, productId);
    };
    return {
        save,
    };
}
