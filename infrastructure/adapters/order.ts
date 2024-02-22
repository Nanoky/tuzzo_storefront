import { Order, OrderCustomer, OrderItem } from "@/business/models/order";
import {
    DocumentData,
    Firestore,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    doc,
} from "firebase/firestore";
import { OrderCustomerDTO, OrderDTO, OrderItemDTO } from "../dto/order";
import { Product } from "@/business/models/product";
import { CollectionNames } from "../enums/collection";
import { Store } from "@/business/models/store";

export class OrderCustomerConverter
    implements FirestoreDataConverter<OrderCustomer, OrderCustomerDTO>
{
    toFirestore(modelObject: OrderCustomer): OrderCustomerDTO {
        return {
            name: modelObject.fullname,
            phone_number: `${modelObject.phoneIndicator}${modelObject.phone}`,
            delivery_address: modelObject.address,
            notes: "Client enregistré depuis le web",
            created_at: new Date(),
            modified_at: new Date(),
            isDeleted: false,
        };
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): OrderCustomer {
        const data = snapshot.data(options);
        return {
            fullname: data.name,
            phone: data.phone_number,
            address: data.delivery_address,
            id: snapshot.id,
        };
    }
}

export class OrderItemConverter
    implements FirestoreDataConverter<OrderItem, OrderItemDTO>
{
    constructor(private db: Firestore) {}
    toFirestore(modelObject: OrderItem): OrderItemDTO {
        return {
            product_id: doc(this.db, `${CollectionNames.STORES}/${modelObject.order.store.id}/${CollectionNames.PRODUCTS}/${modelObject.product.id}`),
            quantity: modelObject.quantity,
            price: modelObject.product.price,
            order_id: doc(
                this.db,
                `${CollectionNames.STORES}/${modelObject.order.store.id}/${CollectionNames.ORDERS}/${modelObject.order.id}`
            ),
            created_at: new Date(),
            modified_at: new Date(),
        };
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): OrderItem {
        const data = snapshot.data(options);
        return {
            product: new Product({
                id: data.product_id,
                name: "",
                description: "",
                price: data.price,
                currency: "",
                nbSold: 0,
                quantity: 0,
                images: [],
                categories: [],
                slug: "",
            }),
            quantity: data.quantity,
            order: new Order({
                id: data.order_id,
                comment: "",
                date: new Date(),
                finalPrice: 0,
                customer: {
                    id: "",
                    address: "",
                    fullname: "",
                    phone: "",
                    phoneIndicator: "",
                },
                items: [],
                store: new Store({ id: "", name: "", slug: "" }),
            }),
        };
    }
}

export class OrderConverter implements FirestoreDataConverter<Order, OrderDTO> {
    constructor(private db: Firestore) {}
    private generateRandom6DigitNumber() {
        return Math.floor(Math.random() * 1000000);
    }
    toFirestore(modelObject: Order): OrderDTO {
        return {
            customer_id: doc(
                this.db,
                `${modelObject.customer.id}`
            ),
            final_price: modelObject.finalPrice,
            order_date: modelObject.date,
            order_notes: modelObject.comment,
            order_number: this.generateRandom6DigitNumber(),
            created_at: new Date(),
            modified_at: new Date(),
            delivery_status_id: 1,
            is_activated: false,
            order_channel_id: 4,
            order_status_id: 2,
            payment_status_id: 1,
        };
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options?: SnapshotOptions | undefined
    ): Order {
        const data = snapshot.data(options);
        return new Order({
            customer: {
                fullname: "",
                phone: "",
                address: "",
                id: data.customer_id,
            },
            items: [],
            date: data.order_date,
            comment: data.order_notes,
            finalPrice: data.final_price,
            id: snapshot.id,
            store: new Store({
                id: "",
                name: "",
                address: "",
                phone: "",
                description: "",
                logo: "",
                city: "",
                slug: "",
            }),
        });
    }
}
