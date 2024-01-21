import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import logo from "@/public/images/logo_tuzzo_original@2x.png";

export default function Home() {
    return (
        <main className="bg-white h-100">
            <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-5 ">
                <Image src={logo} alt="logo" width={200} />
                <button
                    type="button"
                    className="btn btn-primary text-uppercase rounded-pill px-4 py-2">
                    Voir la boutique test
                </button>
            </div>
        </main>
    );
}
