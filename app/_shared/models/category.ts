import { Category } from "@/business/models/category";
import { Serializable } from "../shared/serialize";

export class SerializeCategory extends Category implements Serializable {
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }

    static fromJSON(json: any): SerializeCategory {
        return new SerializeCategory({
            id: json.id,
            name: json.name,
        });
    }
}
