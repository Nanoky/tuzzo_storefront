import { CustomImage } from "@/app/_shared/components/commun/custom-image";
import Layout from "@/app/_shared/components/layout";
import { useProducts } from "@/app/_shared/hooks/product";
import { useShop } from "@/app/_shared/hooks/shop";
import "@/public/css/pages/product.css";
import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import AddCart from "./addCart";

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getProductById } = useProducts();
    const { getStoreById } = useShop();

    const keys = decodeURIComponent(params.slug).split("+");

    const product = await getProductById(keys[0], keys[1]);
    const store = await getStoreById(keys[0]);

    return (
        <Layout storeName={store.name} hasFooter={false} storeSlug={store.id}>
            <div className="d-flex flex-column gap-3 px-product w-100 py-4">
                <div className="d-flex justify-content-center flex-row align-items-center gap-2">
                    <Breadcrumbs
                        title="Détails produit"
                        home_url={`/boutique/${store.id}`}></Breadcrumbs>
                </div>
                <div className="card p-2 rounded-3 d-flex flex-column gap-2">
                    <div className="d-flex justify-content-center align-items-center">
                        <CustomImage
                            url={product.images[0]}
                            name={product.name}
                            wAuto
                            isRelative
                            height="300px"></CustomImage>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="fw-bold">{product.name}</span>
                        <span className="text-primary">
                            {product.price} {product.currency}
                        </span>
                        <span>
                            Ajoutez ce produit au panier pour le commander
                        </span>
                    </div>
                </div>
            </div>
            <div className="position-absolute add-cart-section">
                <AddCart product={product}></AddCart>
            </div>
        </Layout>
    );
}
