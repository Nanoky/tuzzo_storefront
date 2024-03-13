"use client";

import { Product } from "@/business/models/product";
import "./product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faShoppingCart,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
import { CartItem } from "@/business/models/cart";
import { formatPrice } from "../../shared/formatter";
import { TrashIcon } from "./icons/trash-icon";
import { ShoppingCartIcon } from "./icons/shopping-cart";

export function MiniCartProductCard({
    item,
    onDelete,
}: {
    item: CartItem;
    onDelete: () => void;
}) {
    return (
        <MiniProductCardBase
            isLoaded={!!item}
            title={item.product.name}
            subtitle={`Quantité: ${item.quantity}`}
            image={item.product.images[0]}
            cost={`${formatPrice(item.totalPrice)} ${getCurrencyLabel(
                item.product.currency
            )}`}
            onClick={() => {}}
            onClickButton={onDelete}
            buttonIcon={
                <TrashIcon />
            }></MiniProductCardBase>
    );
}

export function MiniProductCard({
    product,
    storeSlug,
}: {
    product: Product;
    storeSlug?: string;
}) {
    const [item, setItem] = useState<SerializeProduct>();
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
        if (!isInCart) addToCart(product, 1);
        else handleGoToProduct();
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
        <MiniProductCardBase
            isLoaded={!!item}
            title={item?.name ?? ""}
            subtitle={item?.categories?.[0]?.name}
            image={item?.images[0] ?? ""}
            cost={`${item?.price ? formatPrice(item.price) : ""} ${getCurrencyLabel(item?.currency ?? "")}`}
            onClick={handleGoToProduct}
            onClickButton={handleAddToCart}
            buttonIcon={
                isInCart ? (
                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                ) : (
                    <ShoppingCartIcon />
                )
            }></MiniProductCardBase>
    );
}

function MiniProductCardBase({
    isLoaded,
    title,
    subtitle,
    cost,
    image,
    buttonIcon,
    onClickButton,
    onClick,
}: {
    isLoaded?: boolean;
    title: string;
    subtitle?: string;
    image: string;
    cost: string;
    buttonIcon: JSX.Element;
    onClickButton?: (e: any) => void;
    onClick?: () => void;
}) {
    const handleClickButton = (e: any) => {
        if (onClickButton) {
            onClickButton(e);
        }
    };

    const handleClickProduct = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <Card className="cursor-pointer w-full card-radius">
                <CardBody className="p-0 flex flex-row h-24">
                    {isLoaded && (
                        <Image
                            src={image}
                            className="object-cover w-24 h-full rounded-e-none"
                            onClick={handleClickProduct}
                            alt={title}
                            width={"100%"}></Image>
                    )}
                    <div
                        className="flex flex-row justify-between items-center grow p-3"
                        onClick={handleClickProduct}>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                {isLoaded ? (
                                    <>
                                        <span className="text-sm font-bold text-wrap">
                                            {title}
                                        </span>
                                        <span className="text-xs text-gray-700">
                                            {subtitle}
                                        </span>
                                    </>
                                ) : (
                                    <Skeleton count={1} width={"200px"} />
                                )}
                            </div>
                            <div className="text-sm">
                                {isLoaded ? (
                                    cost
                                ) : (
                                    <Skeleton width="60px" count={1} />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <NextSkeleton isLoaded={isLoaded}>
                                <Button
                                    type="button"
                                    isIconOnly
                                    onClick={handleClickButton}
                                    color="primary"
                                    className={`rounded-xl text-white`}>
                                    {buttonIcon}
                                </Button>
                            </NextSkeleton>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
