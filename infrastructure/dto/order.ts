import { DocumentReference } from "firebase/firestore";
import { DTO } from "./dto";

export interface OrderCustomerDTO extends DTO {
    name: string;
    phone_number: string;
    delivery_address: string;
    notes: string;
    isDeleted: boolean;
}

export interface OrderItemDTO extends DTO {
    product_id: DocumentReference;
    quantity: number;
    price: number;
    order_id: DocumentReference;
}

export interface OrderDTO extends DTO {
    customer_id: DocumentReference;
    final_price: number;
    order_date: Date;
    order_notes: string;
    order_number: number;
    order_channel_id: 4; // Web storefront
    order_status_id: 2; // En cours de traitement
    delivery_status_id: 1; // Non livré
    is_activated: false;
    payment_status_id: 1; // Non payé
}
