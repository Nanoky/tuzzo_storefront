import { Visit } from "../models/visit";

export interface IVisitActions {
    saveVisit(param: {
        page: string;
        storeId: string;
        productId?: string
    }): Promise<void>;
}

export interface IVisitRepository {
    saveVisit(param: { visit: Visit; storeId: string }): Promise<void>;
}

export interface IVisitStorage {
    saveVisit(param: { visit: Visit; page: string }): Promise<void>;

    getVisits(page: string): Promise<Visit | null>;
}
