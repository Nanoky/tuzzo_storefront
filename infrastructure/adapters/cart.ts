import { Cart } from "@/business/models/cart";
import { ICartRepository } from "@/business/ports/cart";
import { LocalStorage } from "../services/storage";

export class CartRepository implements ICartRepository {
    private ls = new LocalStorage();
    saveCart(cart: Cart): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCart(): Promise<Cart> {
        return new Promise((resolve, reject) => {
            try {
                const cart = this.ls.getItem<Cart>("cart") ?? new Cart();
                resolve(cart);
            } catch (error) {
                reject(error);
            }
        })
    }
    
}