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
import { CollectionNames } from "../enums/collection";

export class OrderRepository implements IOrderRepository {
    constructor(private service: FireStoreService) {}
    save(param: { order: Order }): Promise<Order | null> {
        param.order.setCustomerId(
            param.order.customer.id
                ? `${CollectionNames.STORES}/${param.order.store.id}/${CollectionNames.CUSTOMERS}/${param.order.customer.id}`
                : ""
        );
        return this.service.create({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.order.store.id, `${CollectionNames.ORDERS}`],
            data: param.order,
            getConverter(db) {
                return new OrderConverter(db);
            },
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
                    {
                        fieldPath: "isdeleted",
                        opStr: "==",
                        value: false,
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
    constructor(private service: FireStoreService) {}
    save(param: {
        item: OrderItem;
    }): Promise<OrderItem | null> {
        return this.service.create({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [param.item.order.store.id, `${CollectionNames.ORDER_ITEMS}`],
            data: param.item,
            getConverter(db) {
                return new OrderItemConverter(db);
            },
        });
    }
    saveMany(param: { item: OrderItem[] }): Promise<void> {
        const storeId = param.item?.[0].order.store.id;
        if (!storeId) {
            throw new Error("Missing store id");
        }
        return this.service.createMany({
            collection: `${CollectionNames.STORES}`,
            pathSegments: [storeId, `${CollectionNames.ORDER_ITEMS}`],
            data: param.item,
            getConverter(db) {
                return new OrderItemConverter(db);
            },
        });
    }
}
