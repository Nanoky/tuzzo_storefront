import { Entity } from "../shared/entity";
import { Product } from "./product";
import { Store } from "./store";

export class Category extends Entity {
    private _name!: string;
    public get name(): string {
        return this._name;
    }
    private set name(value: string) {
        this._name = value;
    }
    private _products!: Product[];
    public get products(): Product[] {
        return this._products;
    }
    private set products(value: Product[]) {
        this._products = value;
    }

    private _store!: Store;
    public get store(): Store {
        return this._store;
    }
    private set store(value: Store) {
        this._store = value;
    }

    constructor(param: { id: string; name: string; products: Product[]; store: Store }) {
        super({ id: param.id });
        this.name = param.name;
        this.products = param.products;
        this.store = param.store;
    }
}
