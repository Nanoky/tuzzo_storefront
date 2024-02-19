import Image from "next/image";
import { SerializeStore } from "../../models/store";
import VisitCounter from "../commun/visit-counter";
import Footer from "./footer";
import Header from "./header";
import HeaderWithCover from "./header-with-cover";

import "./layout.css";

export default function Layout({
    children,
    store,
    hasFooter = true,
    productId,
    withCover,
}: {
    children: React.ReactNode;
    store: SerializeStore;
    productId?: string;
    hasFooter?: boolean;
    withCover?: boolean;
}) {
    return (
        <div className={``}>
            <VisitCounter
                storeId={store.id}
                productId={productId}></VisitCounter>
            <div className="h-60">
                <Image
                    src={"/images/default-cover.png"}
                    alt={store.name}
                    fill
                    className="z-0 absolute top-0 w-full object-cover"></Image>
                <div className="relative w-full h-full flex justify-center items-center bg-black/40 z-10 px-3">
                    <div className="text-center flex flex-col text-white">
                        <span className="font-black text-xl md:text-3xl">
                            {store.name}
                        </span>
                        <span className="text-sm md:text-lg">{store.description}</span>
                    </div>
                </div>
            </div>
            <div className="relative z-10 w-full h-screen">
                <div className={`sticky top-0 z-50`}>
                    {withCover ? (
                        <HeaderWithCover store={store}></HeaderWithCover>
                    ) : (
                        <Header store={store}></Header>
                    )}
                </div>
                <div className="d-flex flex-column main bg-secondaryNew">
                    <div className="flex-grow-1">{children}</div>
                    {hasFooter && (
                        <div className="">
                            <Footer storeName={store.name}></Footer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
