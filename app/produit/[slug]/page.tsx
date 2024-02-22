import { CustomImage } from "@/app/_shared/components/commun/custom-image";
import Layout from "@/app/_shared/components/layout-new";
import { useProducts } from "@/app/_shared/hooks/product";
import { useShop } from "@/app/_shared/hooks/shop";
import "./product.css";
import Breadcrumbs from "@/app/_shared/components/commun/breadcrumbs";
import AddCart from "./addCart";
import { Metadata } from "next";
import {
    Button,
    Card,
    CardBody,
    Divider,
    Image,
    Link,
} from "@nextui-org/react";
import {
    createNotFoundRoute,
    createStoreRoute,
} from "@/app/_shared/services/router";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { searchStoreBySlug } from "@/app/_shared/services/store";
import { searchProductBySlug } from "@/app/_shared/services/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type Params = {
    storeSlug: string;
    productSlug: string;
    isWildcard?: boolean;
};

type Props = {
    params: { slug: string };
};

function getSlugs(param: { slug: string }): Params {
    const headerList = headers();
    const hostname = headerList.get("host");

    let storeSlug = "";
    let slug = "";
    let isWildcard = false;

    // Fetch data from external API

    if (hostname?.includes("tuzzo")) {
        storeSlug = hostname?.split(".")[0] ?? "";
        slug = param.slug;
        isWildcard = true;
    } else {
        const keys = param.slug.includes("+")
            ? param.slug.split("+")
            : decodeURIComponent(param.slug).split("+");
        storeSlug = keys[0];
        slug = keys[1];
    }

    // Pass data to the page via props
    return {
        storeSlug,
        productSlug: slug,
        isWildcard,
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { storeSlug, productSlug } = getSlugs(params);

    try {
        const store = await searchStoreBySlug({
            slug: storeSlug,
        });
        if (!store) {
            redirect(createNotFoundRoute());
        }

        const product = await searchProductBySlug({
            slug: productSlug,
            storeId: store.id,
        });

        if (!product) {
            redirect(createNotFoundRoute());
        }

        const title = `${product.name} - ${product.price} ${product.currency}`;

        return {
            title: title,
            description: product.description,
            openGraph: {
                title: title,
                description: product.description,
                images: [product.images[0]],
            },
            twitter: {
                title: title,
                description: product.description,
                images: [product.images[0]],
            },
        };
    } catch (error) {
        redirect(createNotFoundRoute());
    }
}

export default async function ProductPage({ params }: Props) {
    const { storeSlug, productSlug, isWildcard } = await getSlugs(params);
    const { getStoreBySlug } = useShop();
    const { getProductBySlug } = useProducts();

    const store = await getStoreBySlug(storeSlug);
    if (!store) {
        redirect(createNotFoundRoute());
    }

    const product = await getProductBySlug(store.id, productSlug);

    if (!product) {
        redirect(createNotFoundRoute());
    }
    return (
        <Layout store={store} hasFooter={false} productId={product.id}>
            <div className="w-screen overflow-x-hidden flex flex-col gap-4 px-5 lg:px-28 w-full py-4 sm:mb-20 md:mb-20 lg:mb-0 xl:mb-0">
                <div className="flex justify-start flex-row items-center gap-2">
                    <Button
                        isIconOnly
                        as={Link}
                        className="bg-transparent text-primary text-2xl"
                        href={createStoreRoute(
                            isWildcard ? undefined : store.slug
                        )}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Button>
                    <span className="font-bold text-2xl">{product.name}</span>
                </div>
                <div className="relative overflow-x-hidden flex flex-col gap-4">
                    <div className="absolute top-6 left-auto pl-5 w-full">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="w-fit flex flex-row justify-center gap-4 items-center flex-nowrap">
                                {product.images.map((image) => (
                                    <div
                                        key={image}
                                        className={`${
                                            product.images.length > 1
                                                ? "w-72"
                                                : "w-80"
                                        } h-72`}>
                                        <Image
                                            src={image}
                                            alt={product.name}
                                            width={296}
                                            height={296}
                                            classNames={{
                                                wrapper: "h-full",
                                            }}
                                            className="object-cover h-full w-full rounded-3xl"></Image>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Card className="rounded-3xl">
                        <CardBody className="">
                            <div className="flex flex-col gap-2">
                                <div className="h-80 min-w-full w-80 max-w-max"></div>
                                <div className="flex flex-col gap-2 p-2">
                                    <span className="font-bold text-lg">
                                        {product.name}
                                    </span>
                                    <span className="text-primary font-semibold">
                                        {product.price} {product.currency}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <div>
                        <span
                            className={`text-sm ${
                                product.quantity === 0
                                    ? "text-danger"
                                    : "text-black"
                            }`}>
                            {product.quantity === 0
                                ? "Nous sommes en rupture de stock sur ce produit, mais il sera à nouveau disponible prochainement !"
                                : product.description
                                ? product.description
                                : "Ajoutez ce produit au panier pour le commander"}
                        </span>
                    </div>

                    <Divider className="my-1" />

                    <div className="">
                        <AddCart product={product}></AddCart>
                    </div>
                </div>
            </div>
            {/* <div className="absolute add-cart-section bottom-4">
                <AddCart product={product}></AddCart>
            </div> */}
        </Layout>
    );
}
