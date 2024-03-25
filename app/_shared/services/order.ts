import { SaveOrderParams, SearchOrderCustomersParams } from "@/business/ports/order";
import { Instances } from "@/init";

export function saveOrder(param: SaveOrderParams) {
    return Instances.getOrderInstance().saveOrder(param);
}

export function searchCustomers(param: SearchOrderCustomersParams) {
    return Instances.getOrderInstance().searchCustomers(param);
}
