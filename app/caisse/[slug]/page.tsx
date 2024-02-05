import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";

export default async function CheckoutPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStoreById } = useShop();

    const store = await getStoreById(params.slug);

    return (
        <Layout storeName={store.name}>
            <div className="d-flex flex-column gap-3 px-product w-100 py-4">
                <div className="d-flex justify-content-center flex-row align-items-center gap-2">
                    <Breadcrumbs
                        title="Caisse"
                        home_url={`/boutique/${store.id}`}></Breadcrumbs>
                </div>
                <div className="d-flex flex-row"></div>
            </div>
        </Layout>
    );
}
