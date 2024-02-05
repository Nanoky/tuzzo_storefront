import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import Link from "next/link";

export default async function ShopPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getStoreById, getProducts } = useShop();

    const store = await getStoreById(params.slug);

    const products = await getProducts(store.id);

    return (
        <Layout storeName={store.name}>
            <div className="bg-black text-white text-center py-4">
                <div>Bienvenue dans votre boutique</div>
                <div>{store.name}</div>
            </div>
            <div className="p-5 row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {products.map((product) => (
                    <div className="col cursor-pointer" key={product.id}>
                        <Link href={`/produit/${store.id}+${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
