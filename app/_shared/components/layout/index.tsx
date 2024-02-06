import { saveVisit } from "../../services/visit";
import VisitCounter from "../commun/visit-counter";
import Footer from "./footer";
import Header from "./header";

import "./layout.css";

export default function Layout({
    children,
    storeName,
    storeSlug,
    storeId,
    hasFooter = true,
}: {
    children: React.ReactNode;
    storeName: string;
    storeSlug: string;
    storeId: string;
    hasFooter?: boolean;
}) {
    return (
        <div className="bg-white">
            <VisitCounter storeId={storeId}></VisitCounter>
            <div className="fixed-top z-50">
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
