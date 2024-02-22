import Layout from "@/app/_shared/components/layout-new";
import { useShop } from "@/app/_shared/hooks/shop";
import { createStoreRoute } from "@/app/_shared/services/router";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function SuccessPage({
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
            <div className="flex flex-col justify-center items-center pt-4 h-full">
                <div className="flex flex-col justify-center items-center gap-3">
                    <span className="text-9xl text-primary bg-tertiary rounded-full">
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </span>
                    <span className="text-3xl text-primary text-bold">
                        Bravo !
                    </span>
                    <div className="text-semibold flex flex-col justify-center items-center">
                        <span>Votre commande a bien été envoyée</span>
                        <span>Merci de nous avoir fait confiance!</span>
                    </div>
                    <Button
                        as={Link}
                        href={createStoreRoute(store.slug)}
                        className="no-underline"
                        color="primary">
                        Revenir à la boutique
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
