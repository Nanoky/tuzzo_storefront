import { Product } from "@/business/models/product";
import { Store } from "@/business/models/store";
import {
    IStoreRepository,
    SearchStoreParams,
} from "@/business/ports/store";
import { FirestoreDataConverter } from "firebase/firestore";
import { StoreAdapter } from "../adapters/store";
import { FireStoreService } from "../services/firebase";
import { ProductAdapter } from "../adapters/product";
import { CollectionNames } from "../enums/collection";
export class StoreRepository implements IStoreRepository {
    private converter: FirestoreDataConverter<Store, any>;
    private productConverter: FirestoreDataConverter<Product, any>;
    constructor(private service: FireStoreService) {
        this.converter = new StoreAdapter();
        this.productConverter = new ProductAdapter();
    }
    search(params: SearchStoreParams): Promise<Store[]> {
        if (params.slug) {
            return this.service.search({
                collection: `${CollectionNames.STORES}`,
                filters: [
                    { fieldPath: "website", opStr: "==", value: params.slug },
                ],
                converter: this.converter,
            });
        }

        if (params.id) {
            return this.service
                .get({
                    collection: `${CollectionNames.STORES}`,
                    id: params.id,
                    converter: this.converter,
                })
                .then((data) => {
                    if (data) {
                        return [data];
                    } else {
                        return [];
                    }
                });
        }

        return this.service.getAll({
            collection: `${CollectionNames.STORES}`,
            converter: this.converter,
        });
    }
}
