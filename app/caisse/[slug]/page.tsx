import Layout from "@/app/_shared/components/layout-new";
import { useShop } from "@/app/_shared/hooks/shop";
import OrderForm from "./order-form";
import { createStoreRoute } from "@/app/_shared/services/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function CheckoutPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStoreBySlug } = useShop();

    const store = await getStoreBySlug(params.slug);

    if (!store) {
        return null;
    }

    return (
        <Layout store={store}>
            <div className="flex flex-col gap-3 px-page w-100 py-4">
                <div className="flex justify-start flex-row items-center gap-2">
                    <Button
                        isIconOnly
                        as={Link}
                        className="bg-transparent text-primary text-2xl"
                        href={createStoreRoute(store.slug)}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Button>
                    <span className="font-bold text-2xl">Paiement</span>
                </div>
                <OrderForm storeSlug={store.slug} store={store}></OrderForm>
            </div>
        </Layout>
    );
}
