import { Product } from "@/business/models/product";
import { Serializable } from "../shared/serialize";

export class SerializeProduct extends Product implements Serializable {
    toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            currency: this.currency,
            images: this.images,
            quantity: this.quantity,
            nbSold: this.nbSold,
            categories: this.categories,
        };
    }

    static fromJSON(json: any): SerializeProduct {
        return new SerializeProduct({
            id: json.id,
            name: json.name,
            description: json.description,
            price: json.price,
            currency: json.currency,
            images: json.images,
            quantity: json.quantity,
            nbSold: json.nbSold,
            categories: json.categories,
            slug: json.slug,
        });
    }
}
