import Image from "next/image";
import logo from "@/public/images/logo_tuzzo_original@2x.png";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Home() {
    const defautShopSlug = "annavi"; //"6P8v2H4sx7uIJDpPV8zm";
    return (
        <main className="bg-white h-100">
            <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-5 ">
                <Image src={logo} alt="logo" width={200} />
                <Button
                    as={Link}
                    href={`/boutique/${defautShopSlug}`}
                    color="primary"
                    radius="full"
                    className="uppercase text-white no-underline">
                    Voir la boutique test
                </Button>
            </div>
        </main>
    );
}
