import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="vh-100">
            <div className="fixed-top">
                <Header></Header>
            </div>
            <div>{children}</div>
            <div className="sticky-bottom">
                <Footer></Footer>
            </div>
        </div>
    );
}
