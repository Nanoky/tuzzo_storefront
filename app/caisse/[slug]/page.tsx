import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import { Card, CardBody } from "@nextui-org/card";
import CustomerInfos from "./customer-infos";
import DeliveryOption from "./delivery-option";
import PaymentOption from "./payment-option";
import CheckoutSummary from "./checkout-summary";
import { Accordion } from "@nextui-org/react";

export default async function CheckoutPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStoreById } = useShop();

    const store = await getStoreById(params.slug);

    return (
        <Layout storeName={store.name} storeSlug={store.id}>
            <div className="d-flex flex-column gap-3 px-page w-100 py-4">
                <div className="d-flex justify-content-start flex-row align-items-center gap-2">
                    <Breadcrumbs
                        title="Caisse"
                        home_url={`/boutique/${store.id}`}></Breadcrumbs>
                </div>
                <div className="row">
                    <div className="col-8">
                        <Card>
                            <CardBody>
                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex flex-column gap-2">
                                        <span className="text-lg">
                                            On y est presque !
                                        </span>
                                        <span className="text-sm">
                                            Remplissez ce formulaire pour passer
                                            commande
                                        </span>
                                    </div>
                                    <CustomerInfos></CustomerInfos>
                                    <DeliveryOption></DeliveryOption>
                                    <PaymentOption></PaymentOption>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-4">
                        <CheckoutSummary></CheckoutSummary>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
