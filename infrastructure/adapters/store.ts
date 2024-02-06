import { Store } from "@/business/models/store";
import {
    DocumentData,
    FirestoreDataConverter,
    PartialWithFieldValue,
    QueryDocumentSnapshot,
    SetOptions,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { StoreDTO } from "../dto/store";

export class StoreAdapter implements FirestoreDataConverter<Store, StoreDTO> {
    toFirestore(modelObject: WithFieldValue<Store>): WithFieldValue<StoreDTO>;
    toFirestore(
        modelObject: PartialWithFieldValue<Store>,
        options: SetOptions
    ): PartialWithFieldValue<StoreDTO>;
    toFirestore(
        modelObject: unknown,
        options?: unknown
    ): WithFieldValue<StoreDTO> | PartialWithFieldValue<StoreDTO> {
        if (modelObject instanceof Store) {
            return {
                name: modelObject.name,
                store_address: modelObject.address,
                store_city: modelObject.city,
                store_description: modelObject.description,
                store_logo: modelObject.logo,
                store_phone_number: modelObject.phone,
            };
        } else {
            throw new Error("Method not implemented.");
        }
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): Store {
        const data = snapshot.data(options);
        return new Store({
            name: data.name,
            id: snapshot.id,
            address: data.store_address,
            city: data.store_city,
            description: data.store_description,
            logo: data.store_logo,
            phone: data.store_phone_number,
            slug: data.website,
        });
    }
}
