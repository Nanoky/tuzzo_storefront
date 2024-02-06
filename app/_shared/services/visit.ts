import { Instances } from "@/init";

export function saveVisit(storeId: string, page: string) {
    return Instances.getVisitInstance().saveVisit({ page, storeId });
}
