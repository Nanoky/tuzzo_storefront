import { useShop } from "../../_shared/hooks/shop";
import { Store } from "@/business/models/store";
import SmallProductCard from "@/app/_shared/components/commun/small-product-card";

type Props = {
    store: Store;
};
export default async function BestProducts({ store }: Props) {
    const { getBestProducts } = useShop();
    const products = await getBestProducts(store.id, 10);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col px-6">
                <span className="text-2xl font-black md:text-4xl">Produits à la une</span>
                <span className="text-sm md:text-base text-gray-500">Les derniers produits du moment</span>
            </div>
            <div className="flex flex-row gap-1 md:gap-2 px-1 flex-nowrap overflow-x-auto">
                {products.map((product) => (
                    <div key={product.id} className="h-full">
                        <SmallProductCard product={product} storeSlug={store.slug} />
                    </div>
                ))}
            </div>
        </div>
    );
}
