"use client";

import { Product } from "@/business/models/product";
import "./product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faShoppingCart,
    faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/cart";
import { useEffect, useState } from "react";
import { SerializeProduct } from "../../models/product";
import Skeleton from "react-loading-skeleton";
import { CustomImage } from "./custom-image";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getCurrencyLabel } from "../../shared/currency";

export default function ProductCard({
    product,
    storeSlug,
}: {
    product: Product;
    storeSlug: string;
}) {
    const [item, setItem] = useState<Product>();
    const { addToCart, items } = useCart();

    const [isInCart, setIsInCart] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setItem(SerializeProduct.fromJSON(product));
    }, []);

    useEffect(() => {
        const found = items.find((item) => item.product.id === product.id);
        if (found) {
            setIsInCart(true);
        } else {
            setIsInCart(false);
        }
    }, [items]);

    const handleAddToCart = (e: any) => {
        addToCart(product, 1);
        e?.preventDefault();
    };

    const handleGoToProduct = () => {
        router.push(`/produit/${storeSlug}+${product.slug}`);
    };

    return (
        <>
            <Card className="cursor-pointer">
                <CardBody>
                    {item && (
                        <CustomImage
                            url={item.images[0]}
                            name={item.name}
                            width="100%"
                            height="300px"
                            onClick={handleGoToProduct}></CustomImage>
                    )}
                    <div
                        className="card-body d-flex flex-row justify-content-between p-0 pt-3"
                        onClick={handleGoToProduct}>
                        <div className="line-clamp-1">
                            {item ? (
                                item.name
                            ) : (
                                <Skeleton count={1} width={"200px"} />
                            )}
                        </div>
                        <div className="fw-bold">
                            {item ? (
                                `${item.price} ${getCurrencyLabel(
                                    item.currency
                                )}`
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
                                onClick={(e) => {
                                    if (!isInCart) handleAddToCart(e);
                                    else handleGoToProduct();
                                }}
                                className={`btn rounded-4 border-0 ${
                                    isInCart
                                        ? "text-white bg-primary"
                                        : "text-black bg-white opacity-75"
                                }`}>
                                {isInCart ? (
                                    <FontAwesomeIcon
                                        icon={faCheck}></FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}></FontAwesomeIcon>
                                )}
                            </button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
