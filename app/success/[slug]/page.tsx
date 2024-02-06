import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
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
        <Layout
            storeName={store.name}
            storeSlug={store.slug}
            storeId={store.id}>
            <div className="flex flex-column justify-center items-center pt-4">
                <div className="flex flex-column justify-center items-center gap-3">
                    <span className="text-9xl text-primary">
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </span>
                    <span className="text-3xl text-primary text-bold">
                        Bravo !
                    </span>
                    <div className="text-semibold flex flex-column justify-center items-center">
                        <span>Votre commande a bien été envoyée</span>
                        <span>Merci de nous avoir fait confiance!</span>
                    </div>
                    <Button as={Link} href={`/boutique/${store.slug}`} className="no-underline" color="primary">
                        Revenir à la boutique
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
