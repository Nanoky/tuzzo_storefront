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
import { Button, Card, CardBody } from "@nextui-org/react";
import { getCurrencyLabel } from "../../shared/currency";
import { CustomImage } from "./custom-image";
import { createCheckoutRoute } from "../../services/router";

export function CartButton({ slug }: { slug: string }) {
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
        router.push(createCheckoutRoute(slug));
    };

    return (
        <>
            <button
                className="btn btn-outline-primary position-relative border-3 rounded-4"
                title="Cart"
                onClick={handleClick}>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                {count > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary">
                        {count}
                        <span className="visually-hidden">
                            Nombre d&apos;article dans le panier
                        </span>
                    </span>
                )}
            </button>

            <Drawer
                open={open}
                onClose={onClose}
                placement="right"
                width={"320px"}
                height={"fit-content"}
                classNames={{
                    content: "bg-transparent",
                    wrapper: "2xl:me-0 xl:me-4",
                }}
                maskClosable>
                <CartPanel
                    items={items}
                    total={total}
                    onCheckout={handleCheckout}
                    onRemove={handleRemove}
                    onClose={onClose}></CartPanel>
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
        <Card>
            <CardBody>
                <div className="flex flex-column gap-1 text-black">
                    <div className="flex justify-between flex-row">
                        <span className="font-bold text-lg">Résumé</span>
                        <button
                            type="button"
                            className="btn border rounded-3"
                            title="fermer"
                            onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                        </button>
                    </div>
                    {items.length === 0 ? (
                        <div className="text-center flex flex-column">
                            <div></div>
                            <span className="text-lg text-semibold">
                                Panier vide
                            </span>
                            <span className="text-sm">
                                Continuer votre shopping pour remplir votre
                                panier
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-column justify-center items-center gap-2">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="d-flex flex-row justify-between gap-2 w-full">
                                    <div className="d-flex flex-row gap-2">
                                        <CustomImage
                                            url={item.product.images[0]}
                                            name={item.product.name}
                                            width="40px"
                                            isRelative
                                            height="50px"></CustomImage>
                                        <div className="d-flex flex-column">
                                            <span className="text-normal">
                                                {item.product.name}
                                            </span>
                                            <span className="text-xs font-light">
                                                Quantité: {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-column items-end justify-between">
                                        <span className="font-medium text-nowrap">
                                            {item.product.price}{" "}
                                            {getCurrencyLabel(
                                                item.product.currency
                                            )}
                                        </span>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="text-danger cursor-pointer"
                                                onClick={() =>
                                                    handleRemove(item.product)
                                                }></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <hr />
                    <div className="d-flex flex-row justify-content-between">
                        <span className="text-lg">
                            Total{" "}
                            <FontAwesomeIcon
                                icon={faCircleInfo}></FontAwesomeIcon>
                        </span>
                        <span className="font-bold text-xl">{total} F</span>
                    </div>
                    {items.length > 0 && (
                        <div className="row justify-content-center align-items-center py-2">
                            <div className="col-8 d-flex flex-column gap-2">
                                <Button
                                    color="primary"
                                    onClick={handleCheckout}
                                    radius="full"
                                    className="w-full text-sm">
                                    Passer à la caisse
                                </Button>
                                <Button
                                    color="default"
                                    radius="full"
                                    className="w-full text-sm"
                                    onClick={handleClose}>
                                    Continuer mon shopping
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
