import { CustomImage } from "@/app/_shared/components/commun/custom-image";
import Layout from "@/app/_shared/components/layout";
import { useProducts } from "@/app/_shared/hooks/product";
import { useShop } from "@/app/_shared/hooks/shop";

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const { getProduct } = useProducts();
    const { getStoreByProductId } = useShop();

    const product = await getProduct(params.slug);
    const store = await getStoreByProductId(product.id);

    return (
        <Layout storeName={store.name}>
            <div className="d-flex flex-column gap-3 px-5">
                <div></div>
                <div className="card p-2 rounded-3">
                    <div className="d-flex justify-content-center align-items-center">
                        <CustomImage
                            url={product.images[0]}
                            name={product.name}
                            wAuto
                            height="300px"
                            width="250px"></CustomImage>
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
        </Layout>
    );
}
