import { Entity } from "../shared/entity";

export class Product extends Entity {
    private _name!: string;
    public get name(): string {
        return this._name;
    }
    private set name(value: string) {
        this._name = value;
    }
    private _description?: string | undefined;
    public get description(): string | undefined {
        return this._description;
    }
    private set description(value: string | undefined) {
        this._description = value;
    }
    private _price!: number;
    public get price(): number {
        return this._price;
    }
    private set price(value: number) {
        this._price = value;
    }
    private _quantity!: number;
    public get quantity(): number {
        return this._quantity;
    }
    private set quantity(value: number) {
        this._quantity = value;
    }
    private _images!: string[];
    public get images(): string[] {
        return this._images;
    }
    private set images(value: string[]) {
        this._images = value;
    }
    private _nbSold!: number;
    public get nbSold(): number {
        return this._nbSold;
    }
    private set nbSold(value: number) {
        this._nbSold = value;
    }
    private _currency!: string;
    public get currency(): string {
        return this._currency;
    }
    private set currency(value: string) {
        this._currency = value;
    }
    private _categories!: string[];
    public get categories(): string[] {
        return this._categories;
    }
    private set categories(value: string[]) {
        this._categories = value;
    }

    private _slug!: string;
    public get slug(): string {
        return this._slug;
    }
    private set slug(value: string) {
        this._slug = value;
    }

    constructor(param: {
        id: string;
        name: string;
        description?: string;
        price: number;
        quantity: number;
        images?: string[];
        nbSold: number;
        currency: string;
        categories?: string[];
        slug: string;
    }) {
        super({
            id: param.id,
        });
        this.name = param.name;
        this.description = param.description;
        this.price = param.price;
        this.quantity = param.quantity;
        this.images = param.images ?? [];
        this.nbSold = param.nbSold;
        this.currency = param.currency;
        this.categories = param.categories ?? [];
        this.slug = param.slug;
    }

    sell(quantity: number) {
        this.nbSold += quantity;
        this.quantity -= quantity;
    }
}
