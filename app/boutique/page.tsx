import ProductCard from "@/app/_shared/components/commun/product-card";
import Layout from "@/app/_shared/components/layout";
import { useShop } from "@/app/_shared/hooks/shop";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { APP_LOGO } from "@/app/_shared/shared/constants";
import { Metadata } from "next";
import { headers } from "next/headers";

type Params = {
    storeSlug: string;
};

function getSlugs(): Params {
    const headerList = headers();
    const hostname = headerList.get("host");

    let storeSlug = "";

    // Fetch data from external API

    storeSlug = hostname?.split(".")[0] ?? "";

    // Pass data to the page via props
    return {
        storeSlug,
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { storeSlug } = getSlugs();
    const store = await searchStoreBySlug({
        slug: storeSlug,
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
}

export default async function ShopPage() {
    const { getStoreBySlug, getProducts } = useShop();
    const { storeSlug } = getSlugs();

    const store = await getStoreBySlug(storeSlug);

    if (!store) {
        return null;
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
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}
