"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { initCart } from "../../lib/features/cart/cartSlice";
import Loader from "./Loader";

export default function Init() {
    const initialized = useAppSelector((state) => state.cart.initialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initCart());
    }, []);

    return (
        <>
            {!initialized && (
                <div
                    className="absolute top-0 start-0 w-screen h-dvh bg-secondary"
                    style={{ zIndex: 9999 }}>
                    <Loader></Loader>
                </div>
            )}
        </>
    );
}
