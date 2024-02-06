import { Visit } from "../models/visit";
import { IVisitActions, IVisitRepository, IVisitStorage } from "../ports/visit";

export class VisitBusiness implements IVisitActions {
    constructor(
        private storage: IVisitStorage,
        private repository: IVisitRepository
    ) {}
    async saveVisit(param: { page: string; storeId: string }) {
        const hasVisit = await this.storage.getVisits(param.page);
        if (!hasVisit) {
            const visit = new Visit({ date: new Date() });
            await this.repository.saveVisit({
                visit,
                storeId: param.storeId,
            });
            await this.storage.saveVisit({ visit: visit, page: param.page });
        }
    }
}
    