import Footer from "./footer";
import Header from "./header";

import "@/public/css/layouts/layout.css";

export default function Layout({
    children,
    storeName,
    storeSlug,
    hasFooter = true,
}: {
    children: React.ReactNode;
    storeName: string;
    storeSlug: string;
    hasFooter?: boolean;
}) {
    return (
        <div className="bg-white">
            <div className="fixed-top z-3">
                <Header storeName={storeName} storeSlug={storeSlug}></Header>
            </div>
            <div className="d-flex flex-column main vh-100 vw-100 overflow-auto">
                <div className="flex-grow-1">{children}</div>
                {hasFooter && (
                    <div className="">
                        <Footer storeName={storeName}></Footer>
                    </div>
                )}
            </div>
        </div>
    );
}
