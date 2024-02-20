import { ProductDTOAdapter } from "@/infrastructure/adapters/product";
import { CategoryDTO } from "@/infrastructure/dto/category";
import { CollectionNames } from "@/infrastructure/enums/collection";
import { FireStoreService, Firebase } from "@/infrastructure/services/firebase";

export default async function Lab() {
    const db = new Firebase();
    const service = new FireStoreService(db);

    const storeID = "6P8v2H4sx7uIJDpPV8zm";

    const category: CategoryDTO[] = await service.searchRaw({
        collection: `${CollectionNames.STORES}`,
        pathSegments: [storeID, `${CollectionNames.CATEGORIES}`],
        filters: [
            {
                fieldPath: "collection_id",
                opStr: "==",
                value: 29095,
            },
        ],
    });

    console.debug("category", category);

    const promises = category[0].products_of_this_collection.map(
        async (product: any) => {
            return await service.get({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [storeID, `${CollectionNames.PRODUCTS}`],
                id: product.id,
                converter: new ProductDTOAdapter(),
            })
        }
    );

    const products = await Promise.all(promises);

    console.debug("products", products);

    return (
        <div>
            <h1>Lab</h1>
        </div>
    );
}
