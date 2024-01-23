import { Product } from "./product";

export type CartItem = {
    product: Product;
    quantity: number;
    totalPrice: number;
};

export class Cart {
    private _items: CartItem[] = [];
    public get items(): CartItem[] {
        return this._items;
    }
    private set items(value: CartItem[]) {
        this._items = value;
    }

    add(product: Product, quantity: number) {
        const item = this.items.find((item) => item.product.id === product.id);
        if (item) {
            item.quantity += quantity;
            item.totalPrice = item.product.price * quantity;
        } else {
            this.items.push({
                product,
                quantity,
                totalPrice: product.price * quantity,
            });
        }
    }

    remove(product: Product) {
        this.items = this.items.filter(
            (item) => item.product.id !== product.id
        );
    }

    has(product: Product): boolean {
        return !!this.items.find((item) => item.product.id === product.id);
    }

    clear() {
        this.items = [];
    }

    get total(): number {
        return this.items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    }

    get count(): number {
        return this.items.length;
    }
}
