import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";

export default function ShopPage({ params }: { params: { slug: string } }) {
    const { getInfo, getProducts } = useShop();

    getInfo(params.slug).then((info) => {
        console.log(info);
    });
    getProducts(params.slug).then((products) => {
        console.log(products);
    });

    return (
        <Layout>
            <div className="bg-black text-center">
                <div>Bienvenue dans votre boutique</div>
                <div>Boutique</div>
            </div>
        </Layout>
    );
}
