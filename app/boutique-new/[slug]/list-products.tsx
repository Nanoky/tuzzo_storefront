"use client";
import MiniProductCard from "@/app/_shared/components/commun/mini-product-card";
import ProductCard from "@/app/_shared/components/commun/product-card";
import { useCategories } from "@/app/_shared/hooks/category";
import { useShop } from "@/app/_shared/hooks/shop";
import { Category } from "@/business/models/category";
import { Product } from "@/business/models/product";
import { Store } from "@/business/models/store";
import { Chip } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";

type Props = {
    initProducts?: Product[];
    categories: Category[];
    store: Store;
};

export default function ListProducts({
    initProducts,
    categories,
    store,
}: Props) {
    const { getProducts } = useCategories();
    const storehook = useShop();
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>(initProducts ?? []);

    useEffect(() => {
        if (!selectedCategory) {
            storehook.getProducts(store.id).then((products) => {
                console.log("products", products);
                setProducts(products);
            });
        } else {
            getProducts({ id: categories[0].id, storeId: store.id }).then(
                (products) => {
                    console.log("products", products);
                    setProducts(products);
                }
            );
        }
    }, [selectedCategory]);

    const handleSelectCategory = (category?: Category) => {
        setSelectedCategory(category);
    };
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row flex-nowrap gap-1 overflow-x-auto">
                <Chip
                    className={`${
                        !selectedCategory
                            ? "bg-primaryNew text-white"
                            : "bg-white text-black"
                    }`}
                    onClick={() => handleSelectCategory()}>
                    Tous les produits
                </Chip>
                {categories.map((category) => (
                    <Chip
                        key={category.id}
                        className={`${
                            category.id === selectedCategory?.id
                                ? "bg-primaryNew text-white"
                                : "bg-white text-black"
                        }`}
                        onClick={() => handleSelectCategory(category)}>
                        {category.name}
                    </Chip>
                ))}
            </div>
            <div className="p-3 md:p-5 lg:p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-3">
                {products.map((product) => (
                    <Fragment key={product.id}>
                        <div className="hidden sm:block md:block lg:block">
                            <ProductCard
                                product={product}
                                storeSlug={store.slug}
                            />
                        </div>
                        <div className="block sm:hidden md:hidden lg:hidden">
                            <MiniProductCard
                                product={product}
                                storeSlug={store.slug}
                            />
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
