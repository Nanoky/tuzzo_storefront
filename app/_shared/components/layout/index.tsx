import { SerializeStore } from "../../models/store";
import VisitCounter from "../commun/visit-counter";
import Footer from "./footer";
import Header from "./header";

import "./layout.css";

export default function Layout({
    children,
    store,
    hasFooter = true,
}: {
    children: React.ReactNode;
    store: SerializeStore;
    hasFooter?: boolean;
}) {
    return (
        <div className="bg-white">
            <VisitCounter storeId={store.id}></VisitCounter>
            <div className="fixed-top z-50">
                <Header store={store}></Header>
            </div>
            <div className="d-flex flex-column main vh-100 vw-100 overflow-auto">
                <div className="flex-grow-1">{children}</div>
                {hasFooter && (
                    <div className="">
                        <Footer storeName={store.name}></Footer>
                    </div>
                )}
            </div>
        </div>
    );
}
