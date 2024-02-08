"use client";

import { useCart } from "@/app/_shared/hooks/cart";
import { Product } from "@/business/models/product";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./add-chart.css";
import { Button } from "@nextui-org/react";

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
        <div className="w-100 bg-[#94a3b8]/25 p-3 rounded-4 add-cart-container">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div
                    className={`bg-white rounded-pill d-flex flex-row justify-content-between align-items-center gap-3 px-3 py-2 ${
                        product.quantity <= 0 && "invisible"
                    }`}>
                    <span
                        className={`text-danger cursor-pointer ${
                            count <= 1 && "invisible"
                        }`}>
                        <FontAwesomeIcon
                            icon={faMinus}
                            onClick={handleMinus}></FontAwesomeIcon>
                    </span>
                    <span>{count}</span>
                    <span className={`text-success cursor-pointer ${
                        count >= product.quantity && "invisible"
                    }`}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={handlePlus}></FontAwesomeIcon>
                    </span>
                </div>
                <Button
                    color={product.quantity > 0 ? "primary" : "default"}
                    radius="full"
                    onClick={handleAdd}
                    type="button">
                    {product.quantity > 0
                        ? "Ajouter au panier"
                        : "Rupture de stock"}
                </Button>
            </div>
        </div>
    );
}
