import { useShop } from "../../_shared/hooks/shop";
import { Store } from "@/business/models/store";
import SmallProductCard from "@/app/_shared/components/commun/small-product-card";
import { titleClassname, subtitleClassname } from "./shared";

type Props = {
    isWildcard?: boolean;
    store: Store;
};
export default async function BestProducts({ store, isWildcard = true }: Props) {
    const { getBestProducts } = useShop();
    const products = await getBestProducts(store.id, 10);
    return (
        <>
            {products.length ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <span className={titleClassname}>
                            Produits à la une
                        </span>
                        <span className={subtitleClassname}>
                            Les derniers produits du moment
                        </span>
                    </div>
                    <div className="flex flex-row gap-2 md:gap-3 flex-nowrap overflow-x-auto scrollbar-hide">
                        {products.map((product) => (
                            <div key={product.id} className="h-full">
                                <SmallProductCard
                                    product={product}
                                    storeSlug={isWildcard ? undefined : store.slug}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
