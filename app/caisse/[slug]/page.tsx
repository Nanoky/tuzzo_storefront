import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import OrderForm from "./order-form";
import { createStoreRoute } from "@/app/_shared/services/router";

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
