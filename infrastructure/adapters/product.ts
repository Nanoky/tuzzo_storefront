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

const DEFAULT_PRODUCT_IMAGE =
    "https://firebasestorage.googleapis.com/v0/b/ayoka-a2a41.appspot.com/o/no-product-image-available.png?alt=media&token=7edf44a6-472a-4352-8462-780ecc7e6347";

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
                product_categories: modelObject.categories,
                product_images: modelObject.images,
                quantity: modelObject.quantity,
                price: modelObject.price,
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
            price: data.price,
            currency: data.currency,
            images:
                data.product_images?.length > 0
                    ? data.product_images
                    : [DEFAULT_PRODUCT_IMAGE],
            quantity: data.quantity,
            categories: data.product_categories,
            nbSold: data.total_unit_sold,
            slug: data.slug,
        });
    }
}
