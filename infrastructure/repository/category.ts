import { Category } from "@/business/models/category";
import {
    ICategoryRepository,
    SearchCategoryParams,
} from "@/business/ports/category";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import { CategoryAdapter, CategoryDTOConverter } from "../adapters/category";
import { CollectionNames } from "../enums/collection";
import { CategoryDTO } from "../dto/category";

export class CategoryRepository implements ICategoryRepository {
    private adapter: FirestoreDataConverter<Category, any>;
    private dtoAdapter: FirestoreDataConverter<CategoryDTO, any>;
    constructor(private service: FireStoreService) {
        this.adapter = new CategoryAdapter();
        this.dtoAdapter = new CategoryDTOConverter();
    }
    search(params: SearchCategoryParams): Promise<Category[]> {
        if (params.id) {
            return this.service
                .search({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    filters: [
                        {
                            fieldPath: "collection_id",
                            opStr: "==",
                            value: Number.parseInt(params.id),
                        },
                        {
                            fieldPath: "isdeleted",
                            opStr: "==",
                            value: false,
                        },
                    ],
                    converter: this.adapter,
                })
                .then((data) => {
                    if (data) {
                        return data;
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
                        {
                            fieldPath: "isdeleted",
                            opStr: "==",
                            value: false,
                        },
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
                .search({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    filters: [
                        {
                            fieldPath: "isdeleted",
                            opStr: "==",
                            value: false,
                        },
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

    searchRaw(params: SearchCategoryParams): Promise<CategoryDTO[]> {
        console.debug("searchRaw data", params);
        if (params.id) {
            console.debug("searchRaw id", params.id);
            return this.service
                .searchRaw({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    filters: [
                        {
                            fieldPath: "collection_id",
                            opStr: "==",
                            value: Number.parseInt(params.id),
                        },
                        {
                            fieldPath: "isdeleted",
                            opStr: "==",
                            value: false,
                        },
                    ],
                })
                .then((data) => {
                    console.debug("searchRaw res", data);
                    if (data) {
                        return data;
                    }
                    throw new Error("Catégorie introuvable");
                });
        } else if (params.name) {
            return this.service
                .searchRaw({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.CATEGORIES}`,
                    ],
                    filters: [
                        { fieldPath: "name", opStr: "==", value: params.name },
                        {
                            fieldPath: "isdeleted",
                            opStr: "==",
                            value: false,
                        },
                    ],
                })
                .then((data) => {
                    if (data) {
                        return data;
                    }
                    throw new Error("Catégorie introuvable");
                });
        } else {
            return new Promise((resolve) => resolve([]));
        }
    }
}
