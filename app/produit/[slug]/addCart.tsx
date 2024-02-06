"use client";

import { useCart } from "@/app/_shared/hooks/cart";
import { Product } from "@/business/models/product";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./add-chart.css";

export default function AddCart({ product }: { product: Product }) {
    const [count, setCount] = useState(1);
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart(product, count);
    };

    const handleMinus = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handlePlus = () => {
        setCount(count + 1);
    };
    return (
        <div className="w-100 bg-gray-400/25 p-3 rounded-4 add-cart-container">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="bg-white rounded-pill d-flex flex-row justify-content-between align-items-center gap-3 px-3 py-2">
                    <span
                        className={`text-danger cursor-pointer ${
                            count <= 1 && "invisible"
                        }`}>
                        <FontAwesomeIcon
                            icon={faMinus}
                            onClick={handleMinus}></FontAwesomeIcon>
                    </span>
                    <span>{count}</span>
                    <span className="text-success cursor-pointer">
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={handlePlus}></FontAwesomeIcon>
                    </span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    onClick={handleAdd}>
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
}
