import { Cart, CartItem } from "../models/cart";
import { Product } from "../models/product";
import { ICartActions, ICartRepository } from "../ports/cart";

export class CartBusiness implements ICartActions {
    private cart!: Cart;
    constructor(private repository: ICartRepository) {
        this.cart = new Cart();
        repository.getCart().then((cart) => {
            this.cart = cart;
        });
    }
    addToCart(product: Product, quantity: number): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.cart.add(product, quantity);
                this.repository.saveCart(this.cart).then(() => {
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    removeFromCart(product: Product): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.cart.remove(product);
                this.repository.saveCart(this.cart).then(() => {
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    clear(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.cart.clear();
                this.repository.saveCart(this.cart).then(() => {
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    getItems(): Promise<CartItem[]> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.cart.items);
            } catch (error) {
                reject(error);
            }
        });
    }
    getCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.cart.count);
            } catch (error) {
                reject(error);
            }
        });
    }

    getTotal(): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.cart.total);
            } catch (error) {
                reject(error);
            }
        });
    }
}
