"use client";

import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { initCart } from "../../lib/features/cart/cartSlice";

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
                    className="absolute top-0 start-0 w-screen h-dvh bg-secondary flex justify-center items-center"
                    style={{ zIndex: 9999 }}>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#000000"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
        </>
    );
}
