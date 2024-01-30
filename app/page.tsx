import Image from "next/image";
import logo from "@/public/images/logo_tuzzo_original@2x.png";
import Link from "next/link";

export default function Home() {
    const defautShopSlug = "wales";
    return (
        <main className="bg-white h-100">
            <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-5 ">
                <Image src={logo} alt="logo" width={200} />
                <Link href={`/boutique/${defautShopSlug}`}>
                    <button
                        type="button"
                        className="btn btn-primary text-uppercase rounded-pill px-4 py-2">
                        Voir la boutique test
                    </button>
                </Link>
            </div>
        </main>
    );
}
