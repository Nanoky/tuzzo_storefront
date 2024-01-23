import { CartItem } from "@/business/models/cart";
import { Product } from "@/business/models/product";
import { InstanceType, Instances } from "@/init";
import { useState } from "react";

export function useCart() {
    const [items, setItems] = useState<CartItem[]>();
    const [total, setTotal] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const addToCart = (
        product: Product,
        quantity: number,
        callback?: () => void
    ) => {
        Instances.getInstance(InstanceType.cart)
            ?.addToCart(product, quantity)
            .then(() => {
                Instances.getInstance(InstanceType.cart)
                    ?.getItems()
                    .then((items) => {
                        setItems(items);
                        callback?.();
                    });
            });
    };

    const getCount = (callback?: () => void) => {
        Instances.getInstance(InstanceType.cart)
            ?.getCount()
            .then((count) => {
                setCount(count);
                callback?.();
            });
    };

    const removeFromCart = (product: Product) => {
        Instances.getInstance(InstanceType.cart)
            ?.removeFromCart(product)
            .then(() => {
                Instances.getInstance(InstanceType.cart)
                    ?.getItems()
                    .then((items) => {
                        setItems(items);
                    });
            });
    };

    const getItems = (callback?: () => void) => {
        Instances.getInstance(InstanceType.cart)
            ?.getItems()
            .then((items) => {
                setItems(items);
                callback?.();
            });
    };

    const getTotal = (callback?: () => void) => {
        Instances.getInstance(InstanceType.cart)
            ?.getTotal()
            .then((total) => {
                setTotal(total);
                callback?.();
            });
    };

    return {
        items,
        count,
        total,
        getCount,
        addToCart,
        removeFromCart,
        getTotal,
    };
}
