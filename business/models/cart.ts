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

    constructor(param?: { items?: CartItem[] }) {
        this.items = param?.items ?? [];
    }

    add(product: Product, quantity: number) {
        if (quantity > 0) {
            const itemId = this.items.findIndex(
                (item) => item.product.id === product.id
            );
            if (itemId !== -1 && this.items[itemId]) {
                const item: CartItem = {
                    product,
                    quantity: this.items[itemId].quantity + quantity,
                    totalPrice:
                        this.items[itemId].product.price *
                        (this.items[itemId].quantity + quantity),
                };
                let items = [...this.items];
                items.splice(itemId, 1, item);
                this.items = [...items];
            } else {
                this.items = [
                    ...this.items,
                    {
                        product,
                        quantity,
                        totalPrice: product.price * quantity,
                    },
                ];
            }

            console.debug("Product added to cart", this.items);
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
