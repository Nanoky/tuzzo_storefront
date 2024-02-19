import { Category } from "@/business/models/category";
import {
    ICategoryRepository,
    SearchCategoryParams,
} from "@/business/ports/category";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import { CategoryAdapter, CategoryDTOConverter } from "../adapters/category";
import { CollectionNames } from "../enums/collection";
import { IProductRepository } from "@/business/ports/product";
import { Product } from "@/business/models/product";
import { CategoryDTO } from "../dto/category";

export class CategoryRepository implements ICategoryRepository {
    private adapter: FirestoreDataConverter<Category, any>;
    private dtoAdapter: FirestoreDataConverter<CategoryDTO, any>;
    constructor(
        private service: FireStoreService,
        private productRepo: IProductRepository
    ) {
        this.adapter = new CategoryAdapter();
        this.dtoAdapter = new CategoryDTOConverter();
    }
    async getProducts(param: {
        id: string;
        storeId: string;
    }): Promise<Product[]> {
        const categoryData = await this.service
            .get<CategoryDTO>({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [param.storeId, `${CollectionNames.CATEGORIES}`],
                id: param.id,
                converter: this.dtoAdapter,
            })
            .then((data: CategoryDTO | null) => {
                if (data) {
                    return data;
                } else {
                    throw new Error("Catégorie introuvable");
                }
            });

        const promises = categoryData.products_of_this_collection.map(
            async (product) => {
                return await this.productRepo
                    .search({
                        id: product.id,
                        storeId: param.storeId,
                    })
                    .then((data) => {
                        if (data && data.length > 0) {
                            return data[0];
                        }
                        throw new Error("Produit introuvable");
                    });
            }
        );

        const products = await Promise.all(promises);

        return products;
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
