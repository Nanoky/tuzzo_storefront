import { Product } from "@/business/models/product";
import Image from "next/image";
import "@/public/css/components/product-card.css";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="card p-2 border border-1 rounded-4 shadow-sm">
            <Image
                src={product.images[0]}
                alt={product.name}
                className="product-card-image rounded-3"
                width={300}
                height={300}></Image>
            <div className="card-body d-flex flex-row justify-content-between p-0 pt-3">
                <div>{product.name}</div>
                <div className="fw-bold">
                    {product.price} {product.currency}
                </div>
            </div>
        </div>
    );
}
