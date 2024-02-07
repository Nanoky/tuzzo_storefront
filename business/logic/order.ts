import { Order } from "../models/order";
import {
    IOrderActions,
    IOrderCustomerRepository,
    IOrderItemRepository,
    IOrderRepository,
    SaveOrderParams,
} from "../ports/order";
import { IProductRepository } from "../ports/product";

export class OrderBusiness implements IOrderActions {
    constructor(
        private orderRepo: IOrderRepository,
        private orderCustomerRepo: IOrderCustomerRepository,
        private orderItemRepo: IOrderItemRepository,
        private productRepo: IProductRepository
    ) {}
    async saveOrder(param: SaveOrderParams) {
        try {
            let order: Order | null = new Order({
                customer: param.customer,
                items: param.items,
                date: param.date,
                comment: param.comment,
                finalPrice: param.finalPrice,
            });
            const saveOrder = async (customerId: string) => {
                if (order) {
                    order.setCustomerId(customerId);

                    // save order
                    order = await this.orderRepo.save({
                        order,
                        storeId: param.storeId,
                    });
                    if (order) {
                        for (let index = 0; index < param.items.length; index++) {
                            const item = param.items[index];
                            const savedItem = await this.orderItemRepo.save({
                                item: {
                                    product: item.product,
                                    quantity: item.quantity,
                                    orderId: order?.id,
                                },
                                storeId: param.storeId,
                            });

                            if (savedItem) {
                                const products = await this.productRepo.search({
                                    id: item.product.id,
                                    storeId: param.storeId,
                                });
                                let product = products[0];
                                if (product) {
                                    product.sell(item.quantity);

                                    await this.productRepo.update({
                                        product: product,
                                        storeId: param.storeId,
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
                storeId: param.storeId,
            });

            if (customer) {
                return saveOrder(customer.id ?? "");
            } else {
                // if customer not exist create it
                const customer = await this.orderCustomerRepo.save({
                    customer: param.customer,
                    storeId: param.storeId,
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
