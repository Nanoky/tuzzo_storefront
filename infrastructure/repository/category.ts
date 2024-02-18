import { Category } from "@/business/models/category";
import {
    ICategoryRepository,
    SearchCategoryParams,
} from "@/business/ports/category";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import { CategoryAdapter } from "../adapters/category";
import { CollectionNames } from "../enums/collection";
import { IProductRepository } from "@/business/ports/product";

export class CategoryRepository implements ICategoryRepository {
    private adapter: FirestoreDataConverter<Category, any>;
    constructor(
        private service: FireStoreService,
        private productRepo: IProductRepository
    ) {
        this.adapter = new CategoryAdapter(this.service.db, this.productRepo);
    }
    search(params: SearchCategoryParams): Promise<Category[]> {
        if (params.id) {
            return this.service
                .get({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    id: params.id,
                    converter: this.adapter,
                })
                .then((data) => {
                    if (data) {
                        return [data];
                    }
                    throw new Error("Catégorie introuvable");
                });
        } else if (params.name) {
            return this.service
                .search({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    filters: [
                        { fieldPath: "name", opStr: "==", value: params.name },
                    ],
                    converter: this.adapter,
                })
                .then((data) => {
                    if (data) {
                        return data;
                    }
                    throw new Error("Catégorie introuvable");
                });
        } else {
            return this.service
                .getAll({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    converter: this.adapter,
                })
                .then((data) => {
                    if (data) {
                        return data;
                    }
                    throw new Error("Catégorie introuvable");
                });
        }
    }
}
