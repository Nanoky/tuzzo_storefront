"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../hooks/cart";
import { useEffect } from "react";

export function CartButton() {
    const { count, getCount } = useCart();

    useEffect(() => {
        getCount();
    }, []);
    return (
        <button
            className="btn btn-outline-primary position-relative border-3"
            title="Cart">
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {count}
                <span className="visually-hidden">unread messages</span>
            </span>
        </button>
    );
}

export function Cart() {}
