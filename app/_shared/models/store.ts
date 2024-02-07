import { Store } from "@/business/models/store";
import { Serializable } from "../shared/serialize";

export class SerializeStore extends Store implements Serializable {
    toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            city: this.city,
            description: this.description,
            logo: this.logo,
            phone: this.phone,
            slug: this.slug,
        };
    }

    static fromJSON(json: any): SerializeStore {
        return new SerializeStore({
            id: json.id,
            name: json.name,
            address: json.address,
            city: json.city,
            description: json.description,
            logo: json.logo,
            phone: json.phone,
            slug: json.slug,
        });
    }
}
