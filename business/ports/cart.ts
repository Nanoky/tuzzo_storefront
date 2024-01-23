import { Cart, CartItem } from "../models/cart";
import { Product } from "../models/product";

export interface ICartActions {
    addToCart(product: Product, quantity: number): Promise<void>;
    removeFromCart(product: Product): Promise<void>;
    clear(): Promise<void>;
    getItems(): Promise<CartItem[]>;
    getCount(): Promise<number>;
    getTotal(): Promise<number>;
}

export interface ICartRepository {
    saveCart(cart: Cart): Promise<void>;
    getCart(): Promise<Cart>;
}
