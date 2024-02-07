import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import { createNotFoundRoute } from "@/app/_shared/services/router";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { APP_LOGO } from "@/app/_shared/shared/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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

    const store = await getStoreBySlug(params.slug);

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
            <div className="p-5 row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <ProductCard product={product} storeSlug={store.slug} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}
