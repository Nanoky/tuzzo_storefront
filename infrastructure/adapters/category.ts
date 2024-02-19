import { Category } from "@/business/models/category";
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";
import { CategoryDTO } from "../dto/category";
import { Store } from "@/business/models/store";

export class CategoryDTOConverter
    implements FirestoreDataConverter<CategoryDTO, CategoryDTO>
{
    toFirestore(modelObject: CategoryDTO): CategoryDTO {
        return modelObject;
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): CategoryDTO {
        const data = snapshot.data(options);
        return {
            name: data.name,
            collection_id: data.collection_id,
            isdeleted: data.isdeleted,
            products_of_this_collection: data.products_of_this_collection,
        };
    }
}

export class CategoryAdapter
    implements FirestoreDataConverter<Category, CategoryDTO>
{
    constructor() {}
    toFirestore(modelObject: Category): CategoryDTO {
        return {
            name: modelObject.name,
            collection_id: modelObject.id,
            isdeleted: false,
            products_of_this_collection: [],
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
        });
    }
}
