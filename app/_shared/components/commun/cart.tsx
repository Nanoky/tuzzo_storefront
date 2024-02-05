"use client";

import {
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

import "@/public/css/components/cart.css";
import "@/public/css/components/drawer.css";
import { useRouter } from "next/navigation";

export function CartButton({slug}: {slug: string}) {
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
        router.push(`/caisse/${slug}`);
    }

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
                    content: "rounded-4",
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
    onCheckout
}: {
    items: CartItem[];
    total: number;
    onRemove: (product: Product) => void;
    onClose: () => void;
    onCheckout: () => void
}) {
    const handleRemove = (product: Product) => {
        onRemove(product);
    };

    const handleClose = () => {
        onClose();
    };

    const handleCheckout = () => {
        onCheckout();
    }

    return (
        <div className="cart-panel p-3 d-flex flex-column gap-1 text-black">
            <div className="d-flex justify-content-between flex-row">
                <span className="fs-5 fw-normal">Résumé</span>
                <button
                    type="button"
                    className="btn border rounded-3"
                    title="fermer"
                    onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </button>
            </div>
            <div className="d-flex flex-column gap-2">
                {items.map((item) => (
                    <div
                        key={item.product.id}
                        className="d-flex flex-row gap-2">
                        <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={60}
                            height={60}
                            className="rounded-3 cart-item-image"
                            loading="lazy"></Image>
                        <div className="d-flex flex-column flex-grow-1">
                            <span>{item.product.name}</span>
                            <span>Quantité: {item.quantity}</span>
                        </div>
                        <div className="d-flex flex-column align-items-end justify-content-between">
                            <span>
                                {item.product.price} {item.product.currency}
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
            <hr />
            <div className="d-flex flex-row justify-content-between">
                <span className="fs-5">Total</span>
                <span className="fw-bold fs-4">{total} F</span>
            </div>
            {items.length > 0 && (
                <div className="row justify-content-center align-items-center py-4">
                    <div className="col-8 d-flex flex-column gap-2">
                        <button
                            type="button"
                            className="btn btn-primary rounded-pill w-100 p-2" onClick={handleCheckout}>
                            Passer à la caisse
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="btn btn-secondary rounded-pill w-100 p-2">
                            Continuer mon shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
