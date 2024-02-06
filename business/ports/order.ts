import { Order, OrderCustomer, OrderItem } from "../models/order";

export type SaveOrderParams = {
    customer: OrderCustomer;
    items: OrderItem[];
    storeId: string;
    date: Date;
    comment: string;
    finalPrice: number;
};

export interface IOrderActions {
    saveOrder(param: SaveOrderParams): Promise<Order>;
}

export interface IOrderRepository {
    save(param: { order: Order; storeId: string }): Promise<Order | null>;
}

export interface IOrderCustomerRepository {
    save(param: {
        customer: OrderCustomer;
        storeId: string;
    }): Promise<OrderCustomer | null>;
}

export interface IOrderItemRepository {
    save(param: { item: OrderItem[]; storeId: string }): Promise<void>;
}
