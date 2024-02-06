import { Product } from "@/business/models/product";
import {
    IProductRepository,
    SearchProductParams,
} from "@/business/ports/product";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import { ProductAdapter } from "../adapters/product";

export class ProductRepository implements IProductRepository {
    private converter: FirestoreDataConverter<Product, any>;
    constructor(private service: FireStoreService) {
        this.converter = new ProductAdapter();
    }
    search(params: SearchProductParams): Promise<Product[]> {
        if (params.slug) {
            return this.service.search({
                collection: "stores",
                pathSegments: [params.storeId, "products"],
                filters: [
                    { fieldPath: "slug", opStr: "==", value: params.slug },
                ],
                converter: this.converter,
            });
        }

        if (params.id) {
            return this.service
                .get({
                    collection: "stores",
                    pathSegments: [params.storeId, "products"],
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
            collection: "stores",
            pathSegments: [params.storeId, "products"],
            converter: this.converter,
        });
    }
}
