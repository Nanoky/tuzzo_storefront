import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import Layout from "@/app/_shared/components/layout-new";
import { useShop } from "@/app/_shared/hooks/shop";
import {
    createNotFoundRoute,
    createStoreRoute,
} from "@/app/_shared/services/router";
import OrderForm from "./[slug]/order-form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import Link from "next/link";

type Params = {
    storeSlug: string;
};

function getSlugs(): Params {
    const headerList = headers();
    const hostname = headerList.get("host");

    let storeSlug = "";

    // Fetch data from external API

    storeSlug = hostname?.split(".")[0] ?? "";

    // Pass data to the page via props
    return {
        storeSlug,
    };
}

export default async function CheckoutPage() {
    const { storeSlug } = getSlugs();
    const { getStoreBySlug } = useShop();

    const store = await getStoreBySlug(storeSlug);
    if (!store) {
        redirect(createNotFoundRoute());
    }
    return (
        <Layout store={store}>
            <div className="flex flex-col gap-3 px-page w-100 py-4">
                <div className="flex justify-start flex-row items-center gap-2">
                    <Button
                        isIconOnly
                        as={Link}
                        className="bg-transparent text-primary text-2xl"
                        href={createStoreRoute()}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Button>
                    <span className="font-bold text-2xl">Paiement</span>
                </div>
                <OrderForm storeSlug={store.slug} store={store} isWildcard></OrderForm>
            </div>
        </Layout>
    );
}
