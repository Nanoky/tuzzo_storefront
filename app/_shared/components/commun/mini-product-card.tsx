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
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getCurrencyLabel } from "../../shared/currency";
import { createProductRoute } from "../../services/router";

export default function MiniProductCard({
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
            <Card className="cursor-pointer">
                <CardBody className="p-0 flex flex-row h-24">
                    {item && (
                        <CustomImage
                            url={item.images[0]}
                            name={item.name}
                            width="90px"
                            height="100%"
                            wAuto
                            onClick={handleGoToProduct}></CustomImage>
                    )}
                    <div
                        className="flex flex-row justify-between items-center grow p-3"
                        onClick={handleGoToProduct}>
                        <div className="text-wrap text-xs font-medium">
                            {item ? (
                                item.name
                            ) : (
                                <Skeleton count={1} width={"200px"} />
                            )}
                        </div>
                        <div className="flex flex-column gap-2 items-end">
                            <div className="font-bold">
                                {item ? (
                                    `${item.price} ${getCurrencyLabel(
                                        item.currency
                                    )}`
                                ) : (
                                    <Skeleton width="60px" count={1} />
                                )}
                            </div>
                            <Button
                                type="button"
                                isIconOnly
                                onClick={(e) => {
                                    if (!isInCart) handleAddToCart(e);
                                    else handleGoToProduct();
                                }}
                                color="primary"
                                className={`rounded-xl ${
                                    isInCart
                                        ? "text-white"
                                        : "text-black opacity-75"
                                }`}>
                                {isInCart ? (
                                    <FontAwesomeIcon
                                        icon={faCheck}></FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}></FontAwesomeIcon>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
