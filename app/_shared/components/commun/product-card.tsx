import { Product } from "@/business/models/product";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="card p-2">
            <Image
                src={product.images[0]}
                alt={product.name}
                width={480}
                height={640}></Image>
            <div className="card-body d-flex flex-row justify-content-between p-0">
                <div>{product.name}</div>
                <div className="fw-bold">
                    {product.price} {product.currency}
                </div>
            </div>
        </div>
    );
}
