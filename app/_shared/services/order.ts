import { SaveOrderParams } from "@/business/ports/order";
import { Instances } from "@/init";

export function saveOrder(param: SaveOrderParams) {
    return Instances.getOrderInstance().saveOrder(param);
}
