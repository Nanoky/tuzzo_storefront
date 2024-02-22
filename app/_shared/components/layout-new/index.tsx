import Image from "next/image";
import { SerializeStore } from "../../models/store";
import VisitCounter from "../commun/visit-counter";
import Footer from "./footer";
import Header from "./header";

import "./layout.css";

export default function Layout({
    children,
    store,
    hasFooter = true,
    productId,
    withCover = false,
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
            {withCover && (
                <div className="h-60">
                    <Image
                        src={"/images/default-cover.png"}
                        alt={store.name}
                        fill
                        className="z-0 absolute top-0 w-full object-cover"></Image>
                    <div className="absolute top-0 w-full h-full bg-black/40 "></div>
                    <div className="relative w-full h-full flex justify-center items-center px-3 z-10">
                        <div className="text-center flex flex-col text-white">
                            <span className="font-black text-xl md:text-3xl">
                                {store.name}
                            </span>
                            <span className="text-sm md:text-lg">
                                {store.description}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative z-10 w-full min-h-screen h-full bg-secondary">
                <div className={`sticky top-0 z-50`}>
                    <Header store={store} cover={withCover}></Header>
                </div>
                <div className="flex flex-col main">
                    <div className="flex-grow-1">{children}</div>
                    {/* {hasFooter && (
                        <div className="">
                            <Footer storeName={store.name}></Footer>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
