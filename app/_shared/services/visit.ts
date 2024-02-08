import { Instances } from "@/init";

export function saveVisit(storeId: string, page: string, productId?: string) {
    return Instances.getVisitInstance().saveVisit({ page, storeId, productId });
}
