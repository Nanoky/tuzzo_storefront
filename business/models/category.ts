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

    constructor(param: { id: string; name: string }) {
        super({ id: param.id });
        this.name = param.name;
    }
}
