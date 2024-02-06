import { saveVisit } from "../services/visit";

export function useVisit() {
    const save = (storeId: string, page: string) => {
        return saveVisit(storeId, page);
    };
    return {
        save,
    };
}
