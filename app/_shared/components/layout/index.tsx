import Footer from "./footer";
import Header from "./header";

import "@/public/css/layouts/layout.css";

export default function Layout({
    children,
    storeName,
}: {
    children: React.ReactNode;
    storeName: string;
}) {
    return (
        <div className="bg-white">
            <div className="fixed-top z-3">
                <Header storeName={storeName}></Header>
            </div>
            <div className="d-flex flex-column main vh-100 overflow-auto">
                <div className="flex-grow-1">{children}</div>
                <div className="">
                    <Footer storeName={storeName}></Footer>
                </div>
            </div>
        </div>
    );
}
