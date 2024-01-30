import { Cart } from "@/business/models/cart";
import { ICartRepository } from "@/business/ports/cart";
import { LocalStorage } from "../services/storage";
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

export class CartRepository implements ICartRepository {
    private ls = new LocalStorage();
    saveCart(cart: Cart): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ls.setItem("cart", cart, new CartStringAdapter());
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    getCart(): Promise<Cart> {
        return new Promise((resolve, reject) => {
            try {
                const cart =
                    this.ls.getItem<Cart>("cart", new CartAdapter()) ??
                    new Cart();
                resolve(cart);
            } catch (error) {
                reject(error);
            }
        });
    }
}
