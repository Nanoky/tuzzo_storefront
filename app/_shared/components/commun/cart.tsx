"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../hooks/cart";
import { useEffect } from "react";
import Drawer from "rc-drawer";

export function CartButton() {
    const { count } = useCart();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("count", count);
    }, [count]);

    const handleClick = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <button
                className="btn btn-outline-primary position-relative border-3 rounded-4"
                title="Cart">
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary">
                    {count}
                    <span className="visually-hidden">
                        Nombre d&apos;article dans le panier
                    </span>
                </span>
            </button>
            <Drawer>

            </Drawer>
        </>
    );
}

export function Cart() {}
