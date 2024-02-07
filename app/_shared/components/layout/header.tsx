import { Link } from "@nextui-org/react";
import { CartButton } from "../commun/cart";
import { SerializeStore } from "../../models/store";
import Image from "next/image";
import { createStoreRoute } from "../../services/router";

export default function Header({ store }: { store: SerializeStore }) {
    return (
        <header className="navbar py-3 px-4 bg-white">
            <div className="flex flex-row justify-between items-center w-full px-2">
                <div className="flex flex-row gap-2 items-center">
                    {store.logo && (
                        <Image
                            src={store.logo}
                            alt={store.name}
                            width={30}
                            height={30}></Image>
                    )}
                    <Link
                        className="text-lg cursor-pointer font-medium"
                        color="foreground"
                        href={createStoreRoute(store.slug)}>
                        {store.name}
                    </Link>
                </div>
                <div>
                    <CartButton slug={store.slug} />
                </div>
            </div>
        </header>
    );
}
