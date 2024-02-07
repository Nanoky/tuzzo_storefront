import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import { createNotFoundRoute, createStoreRoute } from "@/app/_shared/services/router";
import OrderForm from "./[slug]/order-form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

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
            <div className="d-flex flex-column gap-3 px-page w-100 py-4">
                <div className="d-flex justify-content-start flex-row align-items-center gap-2">
                    <Breadcrumbs
                        title="Caisse"
                        home_url={createStoreRoute(store.slug)}></Breadcrumbs>
                </div>
                <OrderForm
                    storeSlug={store.slug}
                    storeId={store.id}></OrderForm>
            </div>
        </Layout>
    );
}
