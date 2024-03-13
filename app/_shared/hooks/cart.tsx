import { Product } from "@/business/models/product";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addItem, clearCart, removeItem } from "@/app/_shared/lib/features/cart/cartSlice";
import { RootState } from "../lib/store";

export function useCart() {
    const items = useAppSelector((state: RootState) => state.cart.items);
    const count = useAppSelector((state: RootState) => state.cart.nbItems);
    const total = useAppSelector((state: RootState) => state.cart.total);
    const initialized = useAppSelector((state: RootState) => state.cart.initialized);

    const dispatch = useAppDispatch();

    const addToCart = (product: Product, quantity: number) => {
        if (quantity > 0) {
            dispatch(addItem({ product, quantity }));
        }
    };

    const removeFromCart = (product: Product) => {
        dispatch(
            removeItem({
                product,
            })
        );
    };

    const emptyCart = () => {
        dispatch(clearCart());
    }

    return {
        items,
        count,
        total,
        initialized,
        addToCart,
        removeFromCart,
        emptyCart
    };
}
