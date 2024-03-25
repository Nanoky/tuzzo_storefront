"use client";

import { Product } from "@/business/models/product";
import "./product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/cart";
import { useEffect, useState } from "react";
import { SerializeProduct } from "../../models/product";
import Skeleton from "react-loading-skeleton";
import {
    Button,
    Card,
    CardBody,
    Image,
    Skeleton as NextSkeleton,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getCurrencyLabel } from "../../shared/currency";
import { createProductRoute } from "../../services/router";

export default function SmallProductCard({
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
            <Card className="cursor-pointer h-auto w-40 card-radius">
                <CardBody className="p-0">
                    {item && (
                        <Image
                            src={item.images[0]}
                            className="object-fill h-28 w-full rounded-b-none"
                            onClick={handleGoToProduct}
                            alt={item.name}
                            width={"100%"}></Image>
                    )}
                    <div
                        className="p-4 h-32 flex flex-col justify-between"
                        onClick={handleGoToProduct}>
                        <div>
                            <div className="text-sm line-clamp-2 font-semibold">
                                {item ? (
                                    item.name
                                ) : (
                                    <Skeleton count={1} width={"200px"} />
                                )}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                                {item?.categories?.[0]?.name}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center h-10">
                            <span className="font-bold text-sm">
                                {item ? (
                                    `${item.price} ${getCurrencyLabel(
                                        item.currency
                                    )}`
                                ) : (
                                    <Skeleton width="60px" count={1} />
                                )}
                            </span>
                            <NextSkeleton isLoaded={!!item} className="rounded-xl">
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
                                            icon={
                                                faShoppingCart
                                            }></FontAwesomeIcon>
                                    )}
                                </Button>
                            </NextSkeleton>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
