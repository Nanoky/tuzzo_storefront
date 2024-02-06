import { Order, OrderCustomer, OrderItem } from "@/business/models/order";
import {
    IOrderRepository,
    IOrderCustomerRepository,
    IOrderItemRepository,
} from "@/business/ports/order";
import {
    OrderConverter,
    OrderCustomerConverter,
    OrderItemConverter,
} from "../adapters/order";
import { FirestoreDataConverter } from "firebase/firestore";
import { FireStoreService } from "../services/firebase";
import { Product } from "@/business/models/product";

export class OrderRepository implements IOrderRepository {
    private converter: FirestoreDataConverter<Order, any>;
    constructor(private service: FireStoreService) {
        this.converter = new OrderConverter();
    }
    save(param: { order: Order; storeId: string }): Promise<Order | null> {
        param.order.setCustomerId(
            param.order.customer.id
                ? `stores/${param.storeId}/customers/${param.order.customer.id}`
                : ""
        );
        return this.service.create({
            collection: "stores",
            pathSegments: [param.storeId, "order_details"],
            data: param.order,
            converter: this.converter,
        });
    }
}

export class OrderCustomerRepository implements IOrderCustomerRepository {
    private converter: FirestoreDataConverter<OrderCustomer, any>;
    constructor(private service: FireStoreService) {
        this.converter = new OrderCustomerConverter();
    }
    save(param: {
        customer: OrderCustomer;
        storeId: string;
    }): Promise<OrderCustomer | null> {
        return this.service.create({
            collection: "stores",
            pathSegments: [param.storeId, "customers"],
            data: param.customer,
            converter: this.converter,
        });
    }
}

export class OrderItemRepository implements IOrderItemRepository {
    private converter: FirestoreDataConverter<OrderItem, any>;
    constructor(private service: FireStoreService) {
        this.converter = new OrderItemConverter();
    }
    save(param: { item: OrderItem[]; storeId: string }): Promise<void> {
        return this.service.createMany({
            collection: "stores",
            pathSegments: [param.storeId, "order_items"],
            data: param.item.map((item) => {
                return {
                    product: new Product({
                        id: `stores/${param.storeId}/products/${item.product.id}`,
                        name: item.product.name,
                        description: item.product.description,
                        price: item.product.price,
                        currency: item.product.currency,
                        nbSold: 0,
                        quantity: 0,
                        slug: item.product.slug,
                        categories: [],
                        images: [],
                    }),
                    quantity: item.quantity,
                    orderId: `stores/${param.storeId}/order_details/${item.orderId}`,
                };
            }),
            converter: this.converter,
        });
    }
}
