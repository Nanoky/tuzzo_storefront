import { Cart } from "@/business/models/cart";
import { ICartRepository } from "@/business/ports/cart";
import { CartStringAdapter, CartAdapter } from "../adapters/cart";
import { LocalStorage } from "../services/storage";

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