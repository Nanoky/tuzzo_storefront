import { Product } from "@/business/models/product";
import { Serializable } from "../shared/serialize";
import { SerializeCategory } from "./category";

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
            categories: this.categories.map((c) => {
                return {
                    id: c.id,
                    name: c.name,
                };
            }),
            slug: this.slug,
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
            categories: json.categories.map((c: any) => {
                return SerializeCategory.fromJSON({
                    id: c.id,
                    name: c.name,
                });
            }),
            slug: json.slug,
        });
    }
}
