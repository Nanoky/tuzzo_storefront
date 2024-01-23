import { Product } from "@/business/models/product";
import { ICartActions } from "@/business/ports/cart";

export class CartAdapter {
    constructor(private manager: ICartActions) {}

    addToCart(product: Product, quantity: number) {
        return this.manager.addToCart(product, quantity);
    }

    removeFromCart(product: Product) {
        return this.manager.removeFromCart(product);
    }

    clear() {
        return this.manager.clear();
    }

    getItems() {
        return this.manager.getItems();
    }

    getCount() {
        return this.manager.getCount();
    }

    getTotal() {
        return this.manager.getTotal();
    }
}
