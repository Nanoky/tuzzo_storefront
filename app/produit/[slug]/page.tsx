import { CustomImage } from "@/app/_shared/components/commun/custom-image";
import Layout from "@/app/_shared/components/layout";
import { useProducts } from "@/app/_shared/hooks/product";
import { useShop } from "@/app/_shared/hooks/shop";
import "./product.css";
import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import AddCart from "./addCart";
import { Metadata } from "next";
import { searchProductById } from "@/app/_shared/services/product";
import { searchStoreById } from "@/app/_shared/services/store";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const keys = params.slug.includes("+")
        ? params.slug.split("+")
        : decodeURIComponent(params.slug).split("+");

    const store = await searchStoreById({
        id: keys[0],
    });
    const product = await searchProductById({
        id: keys[1],
        storeId: store.id,
    });

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.images[0]],
        },
        twitter: {
            title: product.name,
            description: product.description,
            images: [product.images[0]],
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getProductById } = useProducts();
    const { getStoreById } = useShop();

    const keys = params.slug.includes("+")
        ? params.slug.split("+")
        : decodeURIComponent(params.slug).split("+");

    const store = await getStoreById(keys[0]);
    const product = await getProductById(store.id, keys[1]);

    return (
        <Layout storeName={store.name} hasFooter={false} storeSlug={store.id}>
            <div className="d-flex flex-column gap-3 px-product w-100 py-4">
                <div className="d-flex justify-content-center flex-row align-items-center gap-2">
                    <Breadcrumbs
                        title="Détails produit"
                        home_url={`/boutique/${store.slug}`}></Breadcrumbs>
                </div>
                <Card>
                    <CardBody>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-center align-items-center">
                                <CustomImage
                                    url={product.images[0]}
                                    name={product.name}
                                    wAuto
                                    isRelative
                                    height="300px"></CustomImage>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="font-bold text-lg">
                                    {product.name}
                                </span>
                                <span className="text-primary font-semibold">
                                    {product.price} {product.currency}
                                </span>
                                <span className="text-sm">
                                    Ajoutez ce produit au panier pour le
                                    commander
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="position-absolute add-cart-section">
                <AddCart product={product}></AddCart>
            </div>
        </Layout>
    );
}
