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
            const products = list
                .filter((data) => {
                    return !data.isDeleted;
                })
                .map(async (data) => {
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
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return;
                                });
                        }) ?? [];

                    const categories = await Promise.all(categoriesPromies);

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
                        categories: categories.filter((cat) => !!cat),
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
                    { fieldPath: "ispublished", opStr: "==", value: true },
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

        const promises =
            categoryData.products_of_this_collection?.map(
                async (product: any) => {
                    return await this.search({
                        id: product.id,
                        storeId: param.storeId,
                    }).then((data) => {
                        if (data && data.length > 0) {
                            return data[0];
                        } else {
                            return null;
                        }
                    });
                }
            ) ?? [];

        const products = await Promise.all(promises);

        return products.filter((product) => product !== null) as Product[];
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
            const list = await this.service
                .search({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.PRODUCTS}`,
                    ],
                    filters: [
                        { fieldPath: "slug", opStr: "==", value: params.slug },
                        { fieldPath: "ispublished", opStr: "==", value: true },
                        { fieldPath: "isdeleted", opStr: "==", value: false },
                    ],
                    converter: this.dtoConverter,
                })
                .catch((err) => {
                    console.error(err);
                    return new Array<ProductDTOFull>();
                });

            return await this.formatProductList(list, params.storeId);
        }

        if (params.id) {
            const list = await this.service
                .search({
                    collection: `${CollectionNames.STORES}`,
                    pathSegments: [
                        params.storeId,
                        `${CollectionNames.PRODUCTS}`,
                        params.id,
                    ],
                    filters: [
                        { fieldPath: "isdeleted", opStr: "==", value: false },
                        { fieldPath: "ispublished", opStr: "==", value: true },
                    ],
                    converter: this.dtoConverter,
                })
                .then((data) => {
                    if (data) {
                        return [data];
                    } else {
                        return [];
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return new Array<ProductDTOFull>();
                });

            return await this.formatProductList(list, params.storeId);
        }

        const list = await this.service
            .search({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [params.storeId, `${CollectionNames.PRODUCTS}`],
                filters: [
                    { fieldPath: "isdeleted", opStr: "==", value: false },
                    { fieldPath: "ispublished", opStr: "==", value: true },
                ],
                converter: this.dtoConverter,
            })
            .catch((err) => {
                console.error(err);
                return new Array<ProductDTOFull>();
            });

        return await this.formatProductList(list, params.storeId);
    }
}
