import { Cart } from "@/business/models/cart";
import { IDataAdapter } from "./data";

export class CartAdapter implements IDataAdapter<Cart> {
    from(data: any): Cart {
        return new Cart({
            items: JSON.parse(data),
        });
    }
    to(data: Cart) {
        throw new Error("Method not implemented.");
    }
}

export class CartStringAdapter implements IDataAdapter<string> {
    from(data: Cart): string {
        return JSON.stringify(data.items);
    }
    to(data: string) {
        throw new Error("Method not implemented.");
    }
}
