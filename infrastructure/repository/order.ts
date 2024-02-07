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
import { CollectionNames } from "../enums/collection";

export class OrderRepository implements IOrderRepository {
    private converter: FirestoreDataConverter<Order, any>;
    constructor(private service: FireStoreService) {
        this.converter = new OrderConverter();
    }
    save(param: { order: Order; storeId: string }): Promise<Order | null> {
        param.order.setCustomerId(
            param.order.customer.id
                ? `${CollectionNames.STORES}/${param.storeId}/${CollectionNames.CUSTOMERS}/${param.order.customer.id}`
                : ""
        );
        return this.service.create({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.storeId, `${CollectionNames.ORDERS}`],
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
    get(param: {
        phone: string;
        storeId: string;
    }): Promise<OrderCustomer | null> {
        return this.service
            .search({
                collection: `${CollectionNames.STORES}`,
                pathSegments: [param.storeId, `${CollectionNames.CUSTOMERS}`],
                filters: [
                    {
                        fieldPath: "phone_number",
                        opStr: "==",
                        value: param.phone,
                    },
                ],
                converter: this.converter,
                limit: 1,
            })
            .then((data) => data?.[0] ?? null);
    }
    save(param: {
        customer: OrderCustomer;
        storeId: string;
    }): Promise<OrderCustomer | null> {
        return this.service.create({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.storeId, `${CollectionNames.CUSTOMERS}`],
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
    save(param: { item: OrderItem; storeId: string; }): Promise<OrderItem |null> {
        return this.service.create({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.storeId, `${CollectionNames.ORDER_ITEMS}`],
            data: param.item,
            converter: this.converter,
        });
    }
    saveMany(param: { item: OrderItem[]; storeId: string }): Promise<void> {
        return this.service.createMany({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.storeId, `${CollectionNames.ORDER_ITEMS}`],
            data: param.item.map((item) => {
                return {
                    product: new Product({
                        id: `${CollectionNames.STORES}/${param.storeId}/${CollectionNames.PRODUCTS}/${item.product.id}`,
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
                    orderId: `${CollectionNames.STORES}/${param.storeId}/${CollectionNames.ORDERS}/${item.orderId}`,
                };
            }),
            converter: this.converter,
        });
    }
}
