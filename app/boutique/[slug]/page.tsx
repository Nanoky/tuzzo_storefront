import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";

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
            <div className="bg-black text-white text-center py-4">
                <div>Bienvenue dans votre boutique</div>
                <div>{store.name}</div>
            </div>
            <div className="p-5 row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}
