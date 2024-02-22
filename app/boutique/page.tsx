import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout-new";
import { useShop } from "@/app/_shared/hooks/shop";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { APP_LOGO } from "@/app/_shared/shared/constants";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createNotFoundRoute } from "../_shared/services/router";
import { Fragment } from "react";
import BestProducts from "./[slug]/best-products";
import ListProducts from "./[slug]/list-products";
import { useCategories } from "../_shared/hooks/category";

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
    const { getCategories } = useCategories();

    const store = await getStoreBySlug(storeSlug);

    if (!store) {
        redirect(createNotFoundRoute());
    }

    const categories = await getCategories(store.id);

    const products = undefined; //await getProducts(store.id);

    return (
        <Layout store={store} withCover>
            <div className="pt-8 flex flex-col gap-8 px-4">
                <div>
                    <BestProducts store={store}></BestProducts>
                </div>
                <div>
                    <ListProducts
                        store={store}
                        categories={categories}
                        initProducts={products}></ListProducts>
                </div>
            </div>
        </Layout>
    );
}
