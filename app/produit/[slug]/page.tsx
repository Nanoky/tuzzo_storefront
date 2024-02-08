import { CustomImage } from "@/app/_shared/components/commun/custom-image";
import Layout from "@/app/_shared/components/layout";
import { useProducts } from "@/app/_shared/hooks/product";
import { useShop } from "@/app/_shared/hooks/shop";
import "./product.css";
import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import AddCart from "./addCart";
import { Metadata } from "next";
import { Card, CardBody } from "@nextui-org/react";
import {
    createNotFoundRoute,
    createStoreRoute,
} from "@/app/_shared/services/router";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { searchProductBySlug } from "@/app/_shared/services/product";

type Params = {
    storeSlug: string;
    productSlug: string;
};

type Props = {
    params: { slug: string };
};

function getSlugs(param: { slug: string }): Params {
    const headerList = headers();
    const hostname = headerList.get("host");

    let storeSlug = "";
    let slug = "";

    // Fetch data from external API

    if (hostname?.includes("tuzzo")) {
        storeSlug = hostname?.split(".")[0] ?? "";
        slug = param.slug;
    } else {
        const keys = param.slug.includes("+")
            ? param.slug.split("+")
            : decodeURIComponent(param.slug).split("+");
        storeSlug = keys[0];
        slug = keys[1];
    }

    // Pass data to the page via props
    return {
        storeSlug,
        productSlug: slug,
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { storeSlug, productSlug } = getSlugs(params);

    try {
        const store = await searchStoreBySlug({
            slug: storeSlug,
        });
        if (!store) {
            redirect(createNotFoundRoute());
        }

        const product = await searchProductBySlug({
            slug: productSlug,
            storeId: store.id,
        });

        if (!product) {
            redirect(createNotFoundRoute());
        }

        const title = `${product.name} - ${product.price} ${product.currency}`;

        return {
            title: title,
            description: product.description,
            openGraph: {
                title: title,
                description: product.description,
                images: [product.images[0]],
            },
            twitter: {
                title: title,
                description: product.description,
                images: [product.images[0]],
            },
        };
    } catch (error) {
        redirect(createNotFoundRoute());
    }
}

export default async function ProductPage({ params }: Props) {
    const { storeSlug, productSlug } = await getSlugs(params);
    const { getStoreBySlug } = useShop();
    const { getProductBySlug } = useProducts();

    const store = await getStoreBySlug(storeSlug);
    if (!store) {
        redirect(createNotFoundRoute());
    }

    const product = await getProductBySlug(store.id, productSlug);

    if (!product) {
        redirect(createNotFoundRoute());
    }
    return (
        <Layout store={store} hasFooter={false}>
            <div className="d-flex flex-column gap-3 px-product w-100 py-4 mb-20 sm:mb-20 md:mb-20 lg:mb-0 xl:mb-0">
                <div className="d-flex justify-content-center flex-row align-items-center gap-2">
                    <Breadcrumbs
                        title="Détails produit"
                        home_url={createStoreRoute(store.slug)}></Breadcrumbs>
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
                                <span
                                    className={`text-sm ${
                                        product.quantity === 0
                                            ? "text-danger"
                                            : "text-black"
                                    }`}>
                                    {product.quantity === 0
                                        ? "Nous sommes en rupture de stock sur ce produit, mais il sera à nouveau disponible prochainement !"
                                        : "Ajoutez ce produit au panier pour le commander"}
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="absolute add-cart-section bottom-4">
                <AddCart product={product}></AddCart>
            </div>
        </Layout>
    );
}
