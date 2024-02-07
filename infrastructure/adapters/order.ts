import { Order, OrderCustomer, OrderItem } from "@/business/models/order";
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";
import { OrderCustomerDTO, OrderDTO, OrderItemDTO } from "../dto/order";
import { Product } from "@/business/models/product";

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
    toFirestore(modelObject: OrderItem): OrderItemDTO {
        return {
            product_id: modelObject.product.id,
            quantity: modelObject.quantity,
            price: modelObject.product.price,
            order_id: modelObject.orderId ?? "",
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
            orderId: data.order_id,
        };
    }
}

export class OrderConverter implements FirestoreDataConverter<Order, OrderDTO> {
    private generateRandom6DigitNumber() {
        return Math.floor(Math.random() * 1000000);
    }
    toFirestore(modelObject: Order): OrderDTO {
        return {
            customer_id: modelObject.customer.id ?? "",
            final_price: modelObject.finalPrice,
            order_date: modelObject.date,
            order_notes: modelObject.comment,
            order_numero: `${this.generateRandom6DigitNumber()}`,
            created_at: new Date(),
            modified_at: new Date(),
            delivery_status_id: 1,
            is_activated: true,
            order_channel: 4,
            order_status_id: 1,
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
            },
            items: [],
            date: data.order_date,
            comment: data.order_notes,
            finalPrice: data.final_price,
            id: snapshot.id,
        });
    }
}
