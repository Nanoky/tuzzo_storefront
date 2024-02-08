import { Visit } from "@/business/models/visit";
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";
import { VisitDTO } from "../dto/visit";
import { IDataAdapter } from "./data";

export class VisitStringAdapter implements IDataAdapter<string> {
    from(data: Visit): string {
        return JSON.stringify(data.date);
    }
    to(data: string) {
        throw new Error("Method not implemented.");
    }
}

export class VisitAdapter implements IDataAdapter<Visit> {
    from(data: any): Visit {
        return new Visit({
            date: new Date(data),
        });
    }
    to(data: Visit) {
        throw new Error("Method not implemented.");
    }
}

export class VisitConverter implements FirestoreDataConverter<Visit, VisitDTO> {
    toFirestore(modelObject: Visit): VisitDTO {
        return {
            visit_date: modelObject.date,
            product_id: modelObject.productId,
        };
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): Visit {
        const data = snapshot.data(options);
        return new Visit({
            date: data.visit_date,
            productId: data.product_id,
        });
    }
}
