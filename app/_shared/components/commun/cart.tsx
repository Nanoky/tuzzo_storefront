"use client";

import {
    faCircleInfo,
    faShoppingCart,
    faTrash,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../hooks/cart";
import { useState } from "react";
import Drawer from "rc-drawer";
import Image from "next/image";
import { Product } from "@/business/models/product";
import { CartItem } from "@/business/models/cart";

import "./cart.css";
import "./drawer.css";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, CardBody, Divider, Skeleton } from "@nextui-org/react";
import { getCurrencyLabel } from "../../shared/currency";
import { CustomImage } from "./custom-image";
import { createCheckoutRoute } from "../../services/router";
import { useAppSelector } from "../../lib/hooks";
import { MiniCartProductCard } from "./mini-product-card";
import { formatPrice } from "../../shared/formatter";
import { ShoppingCartIcon } from "./icons/shopping-cart";

export function CartButton({
    slug,
    isWildcard,
}: {
    slug: string;
    isWildcard?: boolean;
}) {
    const { count, total, items, removeFromCart } = useCart();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setOpen(true);
    };

    const onClose = () => {
        console.log("onClose");
        setOpen(false);
    };

    const handleRemove = (product: Product) => {
        removeFromCart(product);
    };

    const handleCheckout = () => {
        router.push(createCheckoutRoute(isWildcard ? undefined : slug));
    };

    return (
        <>
            <Badge
                isInvisible={count === 0}
                content={count}
                shape="circle"
                color="danger"
                size="lg">
                <Skeleton isLoaded={!!items} className="rounded-xl">
                    <Button
                        isIconOnly
                        aria-label="Cart"
                        variant="solid"
                        className="bg-white"
                        onClick={handleClick}>
                        <ShoppingCartIcon isBlack />
                    </Button>
                </Skeleton>
            </Badge>

            <Drawer
                open={open}
                onClose={onClose}
                placement="right"
                width={"320px"}
                height={"fit-content"}
                classNames={{
                    content: "bg-transparent rounded-2xl",
                    wrapper: "2xl:me-0 xl:me-4",
                }}
                maskClosable>
                <Card className="bg-secondary">
                    <CardBody>
                        <CartPanel
                            items={items}
                            total={total}
                            onCheckout={handleCheckout}
                            onRemove={handleRemove}
                            onClose={onClose}></CartPanel>
                    </CardBody>
                </Card>
            </Drawer>
        </>
    );
}

export function CartPanel({
    items,
    total,
    onRemove,
    onClose,
    onCheckout,
}: {
    items: CartItem[];
    total: number;
    onRemove: (product: Product) => void;
    onClose: () => void;
    onCheckout: () => void;
}) {
    const handleRemove = (product: Product) => {
        onRemove(product);
    };

    const handleClose = () => {
        onClose();
    };

    const handleCheckout = () => {
        onCheckout();
    };

    return (
        <div className="flex flex-col gap-4 text-black">
            <div className="flex justify-between flex-row">
                <div className="flex flex-col">
                    <span className="font-bold text-lg">Votre panier</span>
                    <span className="text-xs text-gray-500">
                        Voici la liste de vos produits
                    </span>
                </div>
                <Button color="primary" onClick={handleClose} isIconOnly>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </Button>
            </div>
            {items.length === 0 ? (
                <div className="text-center flex flex-col">
                    <div></div>
                    <span className="text-lg text-semibold">Panier vide</span>
                    <span className="text-sm">
                        Continuer votre shopping pour remplir votre panier
                    </span>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                    {items.map((item) => (
                        <MiniCartProductCard
                            key={item.product.id}
                            onDelete={() => handleRemove(item.product)}
                            item={item}></MiniCartProductCard>
                    ))}
                </div>
            )}
            <Divider></Divider>
            <div className="flex flex-row justify-between py-2">
                <span className="text-sm">Sous-total</span>
                <span className="font-bold text-xl">{formatPrice(total)} F</span>
            </div>
            {items.length > 0 && (
                <div className="flex justify-center items-center py-2">
                    <Button
                        color="primary"
                        onClick={handleCheckout}
                        radius="full"
                        className="text-sm">
                        Payer
                    </Button>
                </div>
            )}
        </div>
    );
}
