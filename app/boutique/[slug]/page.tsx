import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";

import "@/public/css/pages/store.css";

export default async function ShopPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStore, getProducts } = useShop();

    const store = await getStore(params.slug);

    const products = await getProducts(params.slug);

    return (
        <Layout storeName={store.name}>
            <div className="bg-black text-white text-center welcome-container py-4">
                <div>Bienvenue dans votre boutique</div>
                <div>{store.name}</div>
            </div>
            <div className="p-5 row row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </Layout>
    );
}
