import Footer from "./footer";
import Header from "./header";

export default function Layout({
    children,
    storeName,
}: {
    children: React.ReactNode;
    storeName: string;
}) {
    return (
        <div className="vh-100">
            <div className="fixed-top">
                <Header storeName={storeName}></Header>
            </div>
            <div>{children}</div>
            <div className="sticky-bottom">
                <Footer></Footer>
            </div>
        </div>
    );
}
