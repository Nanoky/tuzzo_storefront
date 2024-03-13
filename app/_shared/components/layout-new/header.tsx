import { Link } from "@nextui-org/react";
import { CartButton } from "../commun/cart";
import { SerializeStore } from "../../models/store";
import Image from "next/image";
import { createStoreRoute } from "../../services/router";
import { headers } from "next/headers";

function checkWildcard(): boolean {
    const headerList = headers();
    const hostname = headerList.get("host");
    return hostname?.split(".")[0] !== hostname;
}

export default function Header({ store, cover = false }: { store: SerializeStore, cover?: boolean }) {
    const isWildcard = checkWildcard();
    return (
        <header className={`navbar py-3 px-4 bg-secondary ${cover ? "rounded-t-3xl" : ""}`}>
            <div className="flex flex-row justify-between items-center w-full px-2">
                <div className="flex flex-row gap-2 items-center">
                    {store.logo && (
                        <Image
                            src={store.logo}
                            alt={store.name}
                            width={50}
                            height={50}></Image>
                    )}
                    <Link
                        className="text-lg cursor-pointer font-medium"
                        color="foreground"
                        href={createStoreRoute(
                            isWildcard ? undefined : store.slug
                        )}>
                        {store.name}
                    </Link>
                </div>
                <div>
                    <CartButton slug={store.slug} isWildcard={isWildcard} />
                </div>
            </div>
        </header>
    );
}
