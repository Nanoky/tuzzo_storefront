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
                    className="position-absolute top-0 start-0 vw-100 vh-100 bg-white d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9999 }}>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
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
