import { Product } from "@/business/models/product";
import {
    FirestoreDataConverter,
    WithFieldValue,
    PartialWithFieldValue,
    SetOptions,
    QueryDocumentSnapshot,
    DocumentData,
    SnapshotOptions,
} from "firebase/firestore";
import { ProductDTO } from "../dto/product";

export class ProductAdapter
    implements FirestoreDataConverter<Product, ProductDTO>
{
    toFirestore(
        modelObject: WithFieldValue<Product>
    ): WithFieldValue<ProductDTO>;
    toFirestore(
        modelObject: PartialWithFieldValue<Product>,
        options: SetOptions
    ): PartialWithFieldValue<ProductDTO>;
    toFirestore(
        modelObject: unknown,
        options?: unknown
    ): WithFieldValue<ProductDTO> | PartialWithFieldValue<ProductDTO> {
        if (modelObject instanceof Product) {
            return {
                currency: modelObject.currency,
                description: modelObject.description,
                name: modelObject.name,
                on_sale: true,
                product_categories: modelObject.categories,
                product_images: modelObject.images,
                quantity: modelObject.quantity,
                sale_price: modelObject.price,
                total_unit_sold: modelObject.nbSold,
                slug: modelObject.slug,
            };
        } else {
            throw new Error("Method not implemented.");
        }
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): Product {
        const data = snapshot.data(options);
        return new Product({
            id: snapshot.id,
            name: data.name,
            description: data.description,
            price: data.sale_price,
            currency: data.currency,
            images: data.product_images,
            quantity: data.quantity,
            categories: data.product_categories,
            nbSold: data.total_unit_sold,
            slug: data.slug,
        });
    }
}
