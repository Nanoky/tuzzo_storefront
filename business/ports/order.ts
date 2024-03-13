import { Order, OrderCustomer, OrderItem } from "../models/order";
import { Product } from "../models/product";
import { Store } from "../models/store";

export type SaveOrderParams = {
    customer: OrderCustomer;
    items: {
        product: Product;
        quantity: number;
    }[];
    store: Store;
    date: Date;
    comment: string;
    finalPrice: number;
};

export type SearchOrderCustomersParams = {
    phone: string;
    store: Store;
}

export interface IOrderActions {
    saveOrder(param: SaveOrderParams): Promise<Order>;
    searchCustomers(param: SearchOrderCustomersParams): Promise<OrderCustomer | null>
}

export interface IOrderRepository {
    save(param: { order: Order }): Promise<Order | null>;
}

export interface IOrderCustomerRepository {
    save(param: {
        customer: OrderCustomer;
        storeId: string;
    }): Promise<OrderCustomer | null>;
    get(param: {
        phone: string;
        storeId: string;
    }): Promise<OrderCustomer | null>;
}

export interface IOrderItemRepository {
    saveMany(param: { item: OrderItem[]; storeId: string }): Promise<void>;
    save(param: {
        item: OrderItem;
    }): Promise<OrderItem | null>;
}
