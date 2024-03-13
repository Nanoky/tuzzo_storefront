import { DocumentReference } from "firebase/firestore";
import { DTO } from "./dto";

export interface CategoryDTO {
    collection_id: string;
    isdeleted: boolean;
    name: string;
    products_of_this_collection: DocumentReference[];
}
