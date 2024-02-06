import { IVisitActions } from "@/business/ports/visit";

export class VisitAdapter {
    constructor(private business: IVisitActions) {}

    saveVisit(param: { page: string; storeId: string }) {
        return this.business.saveVisit(param);
    }
}
