"use client";

import { Product } from "@/business/models/product";
import "@/public/css/components/product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/cart";
import { useEffect, useState } from "react";
import { SerializeProduct } from "../../models/product";
import Skeleton from "react-loading-skeleton";
import { CustomImage } from "./custom-image";

export default function ProductCard({ product }: { product: Product }) {
    const [item, setItem] = useState<Product>();
    const { addToCart } = useCart();

    useEffect(() => {
        setItem(SerializeProduct.fromJSON(product));
    }, []);

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div className="card p-2 border border-1 rounded-4 shadow-sm position-relative">
            {item && (
                <CustomImage
                    url={item.images[0]}
                    name={item.name}
                    width="100%"
                    height="300px"></CustomImage>
            )}
            <div className="card-body d-flex flex-row justify-content-between p-0 pt-3">
                <div>
                    {item ? item.name : <Skeleton count={1} width={"200px"} />}
                </div>
                <div className="fw-bold">
                    {item ? (
                        `${item.price} ${item.currency}`
                    ) : (
                        <Skeleton width="60px" count={1} />
                    )}
                </div>
            </div>
            <div className="position-absolute cart-button">
                {item && (
                    <button
                        type="button"
                        title="Add to cart"
                        onClick={handleAddToCart}
                        className="btn bg-white opacity-75 text-black rounded-4 border-0">
                        <FontAwesomeIcon
                            icon={faShoppingCart}></FontAwesomeIcon>
                    </button>
                )}
            </div>
        </div>
    );
}
