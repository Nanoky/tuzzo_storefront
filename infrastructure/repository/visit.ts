import { IVisitRepository, IVisitStorage } from "@/business/ports/visit";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import { Visit } from "@/business/models/visit";
import {
    VisitAdapter,
    VisitConverter,
    VisitStringAdapter,
} from "../adapters/visit";
import { IStorage, SessionStorage } from "../services/storage";
import { IDataAdapter } from "../adapters/data";

export class VisitRepository implements IVisitRepository {
    private converter: FirestoreDataConverter<Visit, any>;
    constructor(private service: FireStoreService) {
        this.converter = new VisitConverter();
    }
    saveVisit(param: { visit: Visit; storeId: string }): Promise<void> {
        return this.service
            .create({
                collection: "stores",
                pathSegments: [param.storeId, "storefront_visits"],
                data: param.visit,
                converter: this.converter,
            })
            .then(() => {
                return;
            });
    }
}

export class VisitStorage implements IVisitStorage {
    private stringAdapter: IDataAdapter<string>;
    private adapter: IDataAdapter<Visit>;
    constructor(private storage: IStorage) {
        this.stringAdapter = new VisitStringAdapter();
        this.adapter = new VisitAdapter();
    }
    saveVisit(param: { visit: Visit; page: string }): Promise<void> {
        return new Promise((resolve, reject) => {
            this.storage.setItem(param.page, param.visit, this.stringAdapter);
            resolve();
        });
    }
    getVisits(page: string): Promise<Visit | null> {
        return new Promise((resolve, reject) => {
            const data = this.storage.getItem<Visit>(page, this.adapter);
            resolve(data);
        });
    }
}
