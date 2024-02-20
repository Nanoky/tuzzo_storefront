import { Product } from "@/business/models/product";
import {
    IProductRepository,
    SearchBestProductsParams,
    SearchProductParams,
} from "@/business/ports/product";
import { FireStoreService } from "../services/firebase";
import { FirestoreDataConverter } from "firebase/firestore";
import {
    DEFAULT_PRODUCT_IMAGE,
    ProductAdapter,
    ProductDTOAdapter,
} from "../adapters/product";
import { CollectionNames } from "../enums/collection";
import { ProductDTOFull } from "../dto/product";
import { ICategoryRepository } from "@/business/ports/category";
import { CategoryDTO } from "../dto/category";
import { CategoryDTOConverter } from "../adapters/category";

export class ProductRepository implements IProductRepository {
    private converter: FirestoreDataConverter<Product, any>;
    private dtoConverter: FirestoreDataConverter<ProductDTOFull, any>;
    private dtoCatAdapter: FirestoreDataConverter<CategoryDTO, any>;
    constructor(
        private service: FireStoreService,
        private categoryRepo: ICategoryRepository
    ) {
        this.converter = new ProductAdapter();
        this.dtoConverter = new ProductDTOAdapter();
        this.dtoCatAdapter = new CategoryDTOConverter();
    }

    async formatProductList(list: any[], storeId: string): Promise<Product[]> {
        if (list && list.length > 0) {
            console.debug("product list", list);
            const products = list.map(async (data) => {
                const categoriesPromies =
                    data.product_categories?.map(async (cat: any) => {
                        return await this.categoryRepo
                            .search({
                                id: cat,
                                storeId: storeId,
                            })
                            .then((data) => {
                                if (data && data.length > 0) {
                                    return data[0];
                                }
                                throw new Error("Catégorie introuvable");
                            });
                    }) ?? [];

                console.debug(
                    "product categories promies count",
                    categoriesPromies.length
                );

                const categories = await Promise.all(categoriesPromies);

                console.debug("product categories", categories);

                return new Product({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    currency: data.currency ?? "",
                    images: data.product_images
                        ? data.product_images?.length > 0
                            ? data.product_images
                            : [DEFAULT_PRODUCT_IMAGE]
                        : [DEFAULT_PRODUCT_IMAGE],
                    quantity: data.quantity ?? 0,
                    categories: categories,
                    nbSold: data.total_unit_sold ?? 0,
                    slug: data.slug,
                });
            });

            return await Promise.all(products);
        } else {
            return [];
        }
    }
    async getBestProducts(
        params: SearchBestProductsParams
    ): Promise<Product[]> {
        const list = await this.service
            .search({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [params.storeId, `${CollectionNames.PRODUCTS}`],
                filters: [
                    { fieldPath: "isdeleted", opStr: "==", value: false },
                ],
                converter: this.dtoConverter,
                limit: params.count,
                orderBy: "total_unit_sold",
            })
            .then((data) => {
                return data;
            });
        return await this.formatProductList(list, params.storeId);
    }
    async getCategoryProducts(param: {
        id: string;
        storeId: string;
    }): Promise<Product[]> {
        console.debug("getProducts", param);
        const categoryData: CategoryDTO = await this.categoryRepo
            .searchRaw({
                id: param.id,
                storeId: param.storeId,
            })
            .then((data) => {
                if (data && data.length > 0) {
                    return data[0];
                }
                throw new Error("Catégorie introuvable");
            });

        const promises = categoryData.products_of_this_collection.map(
            async (product: any) => {
                return await this.search({
                    id: product.id,
                    storeId: param.storeId,
                }).then((data) => {
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
    async search(params: SearchProductParams): Promise<Product[]> {
        if (params.slug) {
            const list = await this.service.search({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [params.storeId, `${CollectionNames.PRODUCTS}`],
                filters: [
                    { fieldPath: "slug", opStr: "==", value: params.slug },
                ],
                converter: this.dtoConverter,
            });

            return await this.formatProductList(list, params.storeId);
        }

        if (params.id) {
            const list = await this.service
                .get({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.PRODUCTS}`,
                    ],
                    id: params.id,
                    converter: this.dtoConverter,
                })
                .then((data) => {
                    if (data) {
                        return [data];
                    } else {
                        return [];
                    }
                });

            return await this.formatProductList(list, params.storeId);
        }

        const list = await this.service.search({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [params.storeId, `${CollectionNames.PRODUCTS}`],
            filters: [{ fieldPath: "isdeleted", opStr: "==", value: false }],
            converter: this.dtoConverter,
        });

        return await this.formatProductList(list, params.storeId);
    }
}
