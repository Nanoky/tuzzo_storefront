"use client";

import { Product } from "@/business/models/product";
import Image from "next/image";
import "@/public/css/components/product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/cart";
import { useEffect, useState } from "react";
import { SerializeProduct } from "../../models/product";
import Skeleton from "react-loading-skeleton";

export default function ProductCard({ product }: { product: Product }) {
    const [item, setItem] = useState<Product>();
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const { addToCart } = useCart();

    useEffect(() => {
        setItem(SerializeProduct.fromJSON(product));
    }, []);

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <div className="card p-2 border border-1 rounded-4 shadow-sm position-relative">
            <div className="position-relative product-card-image">
                {item && (
                    <Image
                        src={item.images[0]}
                        alt={item.name}
                        className="rounded-3"
                        loading="lazy"
                        onLoad={handleImageLoad}
                        fill></Image>
                )}
                {!isImageLoaded && <Skeleton height="100%" />}
            </div>
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
                        className="btn bg-white opacity-75 text-black rounded-4 border-0">
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            onClick={handleAddToCart}></FontAwesomeIcon>
                    </button>
                )}
            </div>
        </div>
    );
}
