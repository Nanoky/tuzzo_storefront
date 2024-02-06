import { Link } from "@nextui-org/react";
import { CartButton } from "../commun/cart";

export default function Header({
    storeName,
    storeSlug,
}: {
    storeName: string;
    storeSlug: string;
}) {
    return (
        <header className="navbar py-3 px-4 bg-white">
            <div className="flex flex-row justify-between items-center w-full px-2">
                <div>
                    <Link
                        className="text-lg cursor-pointer font-medium"
                        color="foreground"
                        href={`/boutique/${storeSlug}`}>
                        {storeName}
                    </Link>
                </div>
                <div>
                    <CartButton slug={storeSlug} />
                </div>
            </div>
        </header>
    );
}
