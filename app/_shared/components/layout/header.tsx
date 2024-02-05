import { CartButton } from "../commun/cart";

export default function Header({ storeName, storeSlug }: { storeName: string, storeSlug: string }) {
    return (
        <header className="navbar py-3 px-4 bg-white">
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <div>
                    <a className="btn">
                        {storeName}
                    </a>
                </div>
                <div>
                    <CartButton slug={storeSlug} />
                </div>
            </div>
        </header>
    );
}
