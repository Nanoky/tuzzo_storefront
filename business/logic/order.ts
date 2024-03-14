import { Order, OrderCustomer } from "../models/order";
import {
    IOrderActions,
    IOrderCustomerRepository,
    IOrderItemRepository,
    IOrderRepository,
    SaveOrderParams,
    SearchOrderCustomersParams,
} from "../ports/order";
import { IProductRepository } from "../ports/product";

export class OrderBusiness implements IOrderActions {
    constructor(
        private orderRepo: IOrderRepository,
        private orderCustomerRepo: IOrderCustomerRepository,
        private orderItemRepo: IOrderItemRepository,
        private productRepo: IProductRepository
    ) {}
    searchCustomers(param: SearchOrderCustomersParams): Promise<OrderCustomer | null> {
        return this.orderCustomerRepo.get({
            phone: param.phone,
            storeId: param.store.id,
        });
    }
    async saveOrder(param: SaveOrderParams) {
        try {
            let order: Order | null = new Order({
                customer: param.customer,
                items: [],
                date: param.date,
                comment: param.comment,
                finalPrice: param.finalPrice,
                store: param.store,
            });
            const saveOrder = async (customerId: string) => {
                if (order) {
                    order.setCustomerId(customerId);

                    // save order
                    const savedOrder = await this.orderRepo.save({
                        order
                    });
                    order.id = savedOrder?.id;

                    if (order) {
                        for (let index = 0; index < param.items.length; index++) {
                            const item = param.items[index];
                            const savedItem = await this.orderItemRepo.save({
                                item: {
                                    product: item.product,
                                    quantity: item.quantity,
                                    order
                                },
                            });

                            if (savedItem) {
                                const products = await this.productRepo.search({
                                    id: item.product.id,
                                    storeId: order.store.id,
                                });
                                let product = products[0];
                                if (product) {
                                    product.sell(item.quantity);

                                    await this.productRepo.update({
                                        product: product,
                                        storeId: order.store.id,
                                    });
                                } else {
                                    throw new Error(
                                        "Echec lors de l'enregistrement de l'article"
                                    );
                                }
                            } else {
                                throw new Error(
                                    "Echec lors de l'enregistrement de l'article"
                                );
                            }
                        }
                        
                        return order;
                    } else {
                        throw new Error(
                            "Echec lors de l'enregistrement de la commande"
                        );
                    }
                } else {
                    throw new Error(
                        "Echec lors de l'enregistrement de la commande"
                    );
                }
            };

            // check if customer exist
            const customer = await this.orderCustomerRepo.get({
                phone: `${param.customer.phoneIndicator}${param.customer.phone}`,
                storeId: param.store.id,
            });

            if (customer) {
                return saveOrder(customer.id ?? "");
            } else {
                // if customer not exist create it
                const customer = await this.orderCustomerRepo.save({
                    customer: param.customer,
                    storeId: param.store.id,
                });

                if (customer) {
                    return saveOrder(customer.id ?? "");
                } else {
                    throw new Error("Echec lors de l'enregistrement du client");
                }
            }
        } catch (error) {
            throw error;
        }
    }
}
