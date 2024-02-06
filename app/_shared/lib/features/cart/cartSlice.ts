import { CartItem } from "@/business/models/cart";
import { Product } from "@/business/models/product";
import { Instances } from "@/init";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

type CartOperationResponse = {
    count: number;
    total: number;
    items: CartItem[];
};

function getCart() {
    return Instances.getCartInstance();
}

type CartOperationError = {
    message: string;
};

export const initCart = createAsyncThunk<
    CartOperationResponse,
    void,
    { rejectValue: CartOperationError }
>("cart/initCart", async () => {
    await getCart()?.init();
    const items = await getCart()?.getItems();
    const count = await getCart()?.getCount();
    const total = await getCart()?.getTotal();
    return {
        count: count ?? 0,
        total: total ?? 0,
        items: items ?? [],
    };
});

export const getItems = createAsyncThunk<
    CartOperationResponse,
    void,
    { rejectValue: CartOperationError }
>("cart/getItems", async () => {
    const items = await getCart()?.getItems();
    const count = await getCart()?.getCount();
    const total = await getCart()?.getTotal();
    return {
        count: count ?? 0,
        total: total ?? 0,
        items: items ?? [],
    };
});

export const addItem = createAsyncThunk<
    CartOperationResponse,
    { product: Product; quantity: number },
    { rejectValue: CartOperationError }
>("cart/addItem", async ({ product, quantity }) => {
    await getCart()?.addToCart(product, quantity);
    const items = await getCart()?.getItems();
    const count = await getCart()?.getCount();
    const total = await getCart()?.getTotal();
    return {
        count: count ?? 0,
        total: total ?? 0,
        items: items ?? [],
    };
});

export const removeItem = createAsyncThunk<
    CartOperationResponse,
    { product: Product },
    { rejectValue: CartOperationError }
>("cart/removeItem", async ({ product }) => {
    await getCart()?.removeFromCart(product);
    const items = await getCart()?.getItems();
    const count = await getCart()?.getCount();
    const total = await getCart()?.getTotal();
    return {
        count: count ?? 0,
        total: total ?? 0,
        items: items ?? [],
    };
});

const slice = createSlice({
    name: "cart",
    initialState: {
        initialized: false,
        nbItems: 0,
        total: 0,
        items: new Array<CartItem>(),
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initCart.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.nbItems = action.payload.count;
            state.total = action.payload.total;
            state.initialized = true;
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.nbItems = action.payload.count;
            state.total = action.payload.total;
        });
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.nbItems = action.payload.count;
            state.total = action.payload.total;

            enqueueSnackbar("Le produit a bien été ajouté au panier", {
                variant: "success",
            });
        });
        builder.addCase(removeItem.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.nbItems = action.payload.count;
            state.total = action.payload.total;
        });
    },
});

export const cartReducer = slice.reducer;
