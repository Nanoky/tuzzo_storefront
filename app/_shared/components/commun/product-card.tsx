"use client";

import { Product } from "@/business/models/product";
import "./product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/cart";
import { useEffect, useState } from "react";
import { SerializeProduct } from "../../models/product";
import Skeleton from "react-loading-skeleton";
import { CustomImage } from "./custom-image";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getCurrencyLabel } from "../../shared/currency";
import { createProductRoute } from "../../services/router";
import { formatPrice } from "../../shared/formatter";

export default function ProductCard({
    product,
    storeSlug,
}: {
    product: Product;
    storeSlug?: string;
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
        router.push(
            createProductRoute({
                storeSlug,
                productSlug: product.slug,
            })
        );
    };

    return (
        <>
            <Card className="cursor-pointer card-radius">
                <CardBody>
                    {item && (
                        <Image
                            src={item.images[0]}
                            className="object-cover w-full h-72 card-radius"
                            onClick={handleGoToProduct}
                            alt={item.name}
                            width={"100%"}></Image>
                    )}
                    <div
                        className="flex flex-row justify-between p-0 pt-3"
                        onClick={handleGoToProduct}>
                        <div className="line-clamp-1">
                            {item ? (
                                item.name
                            ) : (
                                <Skeleton count={1} width={"200px"} />
                            )}
                        </div>
                        <div className="font-bold">
                            {item ? (
                                `${formatPrice(item.price)} ${getCurrencyLabel(
                                    item.currency
                                )}`
                            ) : (
                                <Skeleton width="60px" count={1} />
                            )}
                        </div>
                    </div>
                    <div className="absolute cart-button z-10">
                        {item && (
                            <Button
                                type="button"
                                aria-label="Add to cart"
                                isIconOnly
                                onClick={(e) => {
                                    if (!isInCart) handleAddToCart(e);
                                    else handleGoToProduct();
                                }}
                                variant="solid"
                                className={`text-white bg-primary`}>
                                {isInCart ? (
                                    <FontAwesomeIcon
                                        icon={faCheck}></FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}></FontAwesomeIcon>
                                )}
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
