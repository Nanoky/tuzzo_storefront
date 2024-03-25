"use client";
import ProductCard from "@/app/_shared/components/commun/product-card";
import { useCategories } from "@/app/_shared/hooks/category";
import { useShop } from "@/app/_shared/hooks/shop";
import { Category } from "@/business/models/category";
import { Product } from "@/business/models/product";
import { Store } from "@/business/models/store";
import { Chip } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import { titleClassname, subtitleClassname } from "./shared";
import { MiniProductCard } from "@/app/_shared/components/commun/mini-product-card";
import Loader from "@/app/_shared/components/commun/Loader";
import { useCart } from "@/app/_shared/hooks/cart";

type Props = {
    initProducts?: Product[];
    categories: Category[];
    store: Store;
    isWildcard?: boolean;
};

export default function ListProducts({
    initProducts,
    categories,
    store,
    isWildcard = true,
}: Props) {
    const { initialized } = useCart();
    const { getProducts } = useCategories();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const storehook = useShop();
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>(initProducts ?? []);

    useEffect(() => {
        setIsLoading(true);
        if (!selectedCategory) {
            storehook.getProducts(store.id).then((products) => {
                setProducts(products);
                setIsLoading(false);
            });
        } else {
            getProducts({ id: selectedCategory.id, storeId: store.id }).then(
                (products) => {
                    setProducts(products);
                    setIsLoading(false);
                }
            );
        }
    }, [selectedCategory]);

    const handleSelectCategory = (category?: Category) => {
        setSelectedCategory(category);
    };
    return (
        <>
            {initialized && (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <span className={titleClassname}>Notre catalogue</span>
                        <span className={subtitleClassname}>
                            Tous les produits
                        </span>
                    </div>
                    <div className="flex flex-row flex-nowrap gap-1 overflow-x-auto scrollbar-hide">
                        <Chip
                            className={`${
                                !selectedCategory
                                    ? "bg-primary text-white"
                                    : "bg-white text-black"
                            }`}
                            classNames={{
                                base: "p-6 cursor-pointer",
                            }}
                            onClick={() => handleSelectCategory()}>
                            Tous les produits
                        </Chip>
                        {categories.map((category) => (
                            <Chip
                                key={category.id}
                                className={`${
                                    category.id === selectedCategory?.id
                                        ? "bg-primary text-white"
                                        : "bg-white text-black"
                                }`}
                                classNames={{
                                    base: "p-6 cursor-pointer",
                                }}
                                onClick={() => handleSelectCategory(category)}>
                                {category.name}
                            </Chip>
                        ))}
                    </div>
                    <div className="pe-4">
                        <div
                            className={`py-3 md:p-5 lg:p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-3 ${
                                (!products.length || isLoading) && "hidden"
                            }`}>
                            {products.map((product) => (
                                <Fragment key={product.id}>
                                    <div className="hidden sm:block md:block lg:block">
                                        <ProductCard
                                            product={product}
                                            storeSlug={
                                                isWildcard
                                                    ? undefined
                                                    : store.slug
                                            }
                                        />
                                    </div>
                                    <div className="block sm:hidden md:hidden lg:hidden">
                                        <MiniProductCard
                                            product={product}
                                            storeSlug={
                                                isWildcard
                                                    ? undefined
                                                    : store.slug
                                            }
                                        />
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                        <div
                            className={`min-h-60 max-h-full flex flex-col items-center justify-center gap-4 text-center ${
                                (products.length || isLoading) && "hidden"
                            }`}>
                            <span className="text-3xl font-bold">Ooops</span>
                            <span className="text-gray-500">
                                {`Cette ${
                                    selectedCategory ? "catégorie" : "boutique"
                                } n'a pas encore de produits`}
                            </span>
                        </div>
                        <div className={`${!isLoading && "hidden"} h-96`}>
                            <Loader></Loader>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
