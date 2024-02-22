import Layout from "@/app/_shared/components/layout-new";
import { useShop } from "@/app/_shared/hooks/shop";
import { createNotFoundRoute } from "@/app/_shared/services/router";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { APP_LOGO } from "@/app/_shared/shared/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import BestProducts from "./best-products";
import { useCategories } from "@/app/_shared/hooks/category";
import ListProducts from "./list-products";
import NotFound from "@/app/_shared/components/commun/404";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const store = await searchStoreBySlug({
            slug: params.slug,
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

export default async function ShopPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStoreBySlug, getProducts } = useShop();
    const { getCategories } = useCategories();

    const store = await getStoreBySlug(params.slug);

    if (!store) {
        console.error("Store not found", params, store);
        return <NotFound></NotFound>;
    }

    const categories = await getCategories(store.id);

    const products = undefined; // await getProducts(store.id);

    return (
        <Layout store={store} withCover>
            <div className="pt-8 flex flex-col gap-8 px-4">
                <div>
                    <BestProducts store={store}></BestProducts>
                </div>
                <div>
                    <ListProducts
                        store={store}
                        isWildcard={false}
                        categories={categories}
                        initProducts={products}></ListProducts>
                </div>
            </div>
        </Layout>
    );
}
