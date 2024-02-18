import { Category } from "@/business/models/category";
import {
    DocumentData,
    Firestore,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    doc,
    getDoc,
} from "firebase/firestore";
import { CategoryDTO } from "../dto/category";
import { CollectionNames } from "../enums/collection";
import { Store } from "@/business/models/store";
import { ProductAdapter } from "./product";
import { Product } from "@/business/models/product";
import { IProductRepository } from "@/business/ports/product";

export class CategoryAdapter
    implements FirestoreDataConverter<Category, CategoryDTO>
{
    constructor(private db: Firestore, private productRepo: IProductRepository) {}
    toFirestore(modelObject: Category): CategoryDTO {
        return {
            name: modelObject.name,
            collection_id: modelObject.id,
            isdeleted: false,
            products_of_this_collection: modelObject.products.map((p) => {
                return doc(
                    this.db,
                    `${CollectionNames.STORES}/${modelObject.store.id}/${CollectionNames.PRODUCTS}/${p.id}`
                );
            }),
        };
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): Category {
        const data = snapshot.data(options);
        return new Category({
            id: data.collection_id,
            name: data.name,
            store: new Store({
                id: "",
                name: "",
                slug: "",
            }),
            products: data.products_of_this_collection
                .map(async (p: string) => {
                    return await this.productRepo.search({
                        id: p,
                        storeId: snapshot.ref.parent.id,
                    })
                    /* const ref = doc(this.db, p).withConverter(
                        new ProductAdapter()
                    );

                    const docSnap = await getDoc(ref);

                    if (docSnap.exists()) {
                        return docSnap.data();
                    } else {
                        return null;
                    } */
                })
                /* .filter((product: Product | null) => {
                    return product !== null;
                }), */
        });
    }
}
