import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const store = await searchStoreBySlug({
        slug: params.slug,
    });
    return {
        title: store.name,
        description: store.description,
        openGraph: {
            title: store.name,
            description: store.description,
        },
        twitter: {
            title: store.name,
            description: store.description,
        },
    };
}

export default async function ShopPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStoreBySlug, getProducts } = useShop();

    const store = await getStoreBySlug(params.slug);

    const products = await getProducts(store.id);

    return (
        <Layout storeName={store.name} storeSlug={store.id}>
            <div className="bg-black text-white text-center py-4">
                <div>Bienvenue dans votre boutique</div>
                <div>{store.name}</div>
            </div>
            <div className="p-5 row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <Link
                            href={`/produit/${store.id}+${product.id}`}
                            className="text-decoration-none">
                            <ProductCard product={product} />
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
