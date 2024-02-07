import { Order } from "../models/order";
import {
    IOrderActions,
    IOrderCustomerRepository,
    IOrderItemRepository,
    IOrderRepository,
    SaveOrderParams,
} from "../ports/order";

export class OrderBusiness implements IOrderActions {
    constructor(
        private orderRepo: IOrderRepository,
        private orderCustomerRepo: IOrderCustomerRepository,
        private orderItemRepo: IOrderItemRepository
    ) {}
    saveOrder(param: SaveOrderParams): Promise<Order> {
        return new Promise((resolve, reject) => {
            let order = new Order({
                customer: param.customer,
                items: param.items,
                date: param.date,
                comment: param.comment,
                finalPrice: param.finalPrice,
            });
            const saveOrder = (customerId: string) => {
                order.setCustomerId(customerId);

                this.orderRepo
                    .save({
                        order,
                        storeId: param.storeId,
                    })
                    .then((order) => {
                        if (order) {
                            this.orderItemRepo
                                .save({
                                    item: param.items.map((item) => {
                                        return {
                                            product: item.product,
                                            quantity: item.quantity,
                                            orderId: order.id,
                                        };
                                    }),
                                    storeId: param.storeId,
                                })
                                .then(() => {
                                    resolve(order);
                                });
                        } else {
                            reject(
                                "Echec lors de l'enregistrement de la commande"
                            );
                        }
                    });
            };
            this.orderCustomerRepo
                .get({
                    phone: `${param.customer.phoneIndicator}${param.customer.phone}`,
                    storeId: param.storeId,
                })
                .then((customer) => {
                    if (customer) {
                        saveOrder(customer.id ?? "");
                    } else {
                        this.orderCustomerRepo
                            .save({
                                customer: param.customer,
                                storeId: param.storeId,
                            })
                            .then((customer) => {
                                if (customer) {
                                    saveOrder(customer.id ?? "");
                                } else {
                                    reject(
                                        "Echec lors de l'enregistrement de la commande"
                                    );
                                }
                            });
                    }
                });
        });
    }
}
