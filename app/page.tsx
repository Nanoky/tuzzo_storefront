import Image from "next/image";
import logo from "@/public/images/logo_tuzzo_original@2x.png";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { createStoreRoute } from "./_shared/services/router";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function handleRedirect() {
    const headerList = headers();
    const hostname = headerList.get("host");

    if (hostname?.includes("tuzzo")) {
        redirect(createStoreRoute());
    }
}

export default function Home() {
    const defautShopSlug = "steco"; //"6P8v2H4sx7uIJDpPV8zm";
    handleRedirect();
    return (
        <main className="bg-white h-full">
            <div className="flex flex-col justify-center items-center h-full gap-5 ">
                <Image src={logo} alt="logo" width={200} />
                <Button
                    as={Link}
                    href={createStoreRoute(defautShopSlug)}
                    color="primary"
                    radius="full"
                    style={{ backgroundColor: "#99ff99 !important" }}
                    className="uppercase text-black font-bold no-underline">
                    Voir la boutique test
                </Button>
            </div>
        </main>
    );
}
