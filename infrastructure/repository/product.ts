import { Product } from "@/business/models/product";
import {
    IProductRepository,
    SearchProductParams,
} from "@/business/ports/product";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import { ProductAdapter } from "../adapters/product";
import { CollectionNames } from "../enums/collection";

export class ProductRepository implements IProductRepository {
    private converter: FirestoreDataConverter<Product, any>;
    constructor(private service: FireStoreService) {
        this.converter = new ProductAdapter();
    }
    update(param: {
        product: Product;
        storeId: string;
    }): Promise<Product | null> {
        return this.service.update({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.storeId, `${CollectionNames.PRODUCTS}`],
            id: param.product.id,
            data: param.product,
            converter: this.converter,
        });
    }
    search(params: SearchProductParams): Promise<Product[]> {
        if (params.slug) {
            return this.service.search({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [params.storeId, `${CollectionNames.PRODUCTS}`],
                filters: [
                    { fieldPath: "slug", opStr: "==", value: params.slug },
                ],
                converter: this.converter,
            });
        }

        if (params.id) {
            return this.service
                .get({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.PRODUCTS}`,
                    ],
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
            pathSegments: [params.storeId, `${CollectionNames.PRODUCTS}`],
            converter: this.converter,
        });
    }
}
