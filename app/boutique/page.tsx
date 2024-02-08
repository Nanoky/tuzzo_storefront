import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { APP_LOGO } from "@/app/_shared/shared/constants";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createNotFoundRoute } from "../_shared/services/router";
import MiniProductCard from "../_shared/components/commun/mini-product-card";
import { Fragment } from "react";

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

export async function generateMetadata(): Promise<Metadata> {
    const { storeSlug } = getSlugs();
    try {
        const store = await searchStoreBySlug({
            slug: storeSlug,
        });
        return {
            title: store.name,
            description: store.description,
            openGraph: {
                title: store.name,
                description: store.description,
                images: [store.logo ?? APP_LOGO],
            },
            twitter: {
                title: store.name,
                description: store.description,
                images: [store.logo ?? APP_LOGO],
            },
        };
    } catch (error) {
        redirect(createNotFoundRoute());
    }
}

export default async function ShopPage() {
    const { getStoreBySlug, getProducts } = useShop();
    const { storeSlug } = getSlugs();

    const store = await getStoreBySlug(storeSlug);

    if (!store) {
        redirect(createNotFoundRoute());
    }

    const products = await getProducts(store.id);

    return (
        <Layout store={store}>
            <div className="bg-black text-white text-center py-4">
                <div>Bienvenue dans votre boutique</div>
                <div>{store.name}</div>
            </div>
            <div className="p-3 md:p-5 lg:p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-3">
                {products.map((product) => (
                    <Fragment key={product.id}>
                        <div className="hidden sm:block md:block lg:block">
                            <ProductCard
                                product={product}
                            />
                        </div>
                        <div className="block sm:hidden md:hidden lg:hidden">
                            <MiniProductCard
                                product={product}
                            />
                        </div>
                    </Fragment>
                ))}
            </div>
        </Layout>
    );
}
