"use client";

import { useCart } from "@/app/_shared/hooks/cart";
import { Product } from "@/business/models/product";
import {
    faCartShopping,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
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
        <div className="w-full bg-tertiary p-3 rounded-full add-cart-container">
            <div className="flex flex-row justify-between items-center">
                <div
                    className={`flex flex-row justify-between items-center gap-3 px-3 py-2 ${
                        product.quantity <= 0 && "invisible"
                    }`}>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        onClick={handleMinus}
                        className={`bg-transparent border-primary ${
                            count <= 1 && "invisible"
                        }`}>
                        <FontAwesomeIcon
                            icon={faMinus}
                            ></FontAwesomeIcon>
                    </Button>
                    <span className="font-bold">{count}</span>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        onClick={handlePlus}
                        className={`bg-transparent border-primary flex flex-row justify-between items-center gap-3 px-3 py-2 ${
                            count >= product.quantity && "invisible"
                        }`}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            ></FontAwesomeIcon>
                    </Button>
                </div>
                <Button
                    color={product.quantity > 0 ? "primary" : "default"}
                    radius="full"
                    onClick={handleAdd}
                    startContent={
                        <FontAwesomeIcon
                            icon={faCartShopping}></FontAwesomeIcon>
                    }
                    type="button">
                    {product.quantity > 0
                        ? "Ajouter au panier"
                        : "Rupture de stock"}
                </Button>
            </div>
        </div>
    );
}
