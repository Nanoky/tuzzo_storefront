import { Product } from "./product";
import { Store } from "./store";

export type OrderCustomer = {
    id?: string;
    phone: string;
    phoneIndicator?: string;
    fullname: string;
    address: string;
};

export type OrderItem = {
    product: Product;
    quantity: number;
    order: Order;
};

export class Order {
    private _id?: string;
    public get id(): string | undefined {
        return this._id;
    }
    public set id(value: string | undefined) {
        this._id = value;
    }
    private _customer!: OrderCustomer;
    public get customer(): OrderCustomer {
        return this._customer;
    }
    private set customer(value: OrderCustomer) {
        this._customer = value;
    }
    private _items!: OrderItem[];
    public get items(): OrderItem[] {
        return this._items;
    }
    private set items(value: OrderItem[]) {
        this._items = value;
    }
    private _date!: Date;
    public get date(): Date {
        return this._date;
    }
    private set date(value: Date) {
        this._date = value;
    }
    private _comment!: string;
    public get comment(): string {
        return this._comment;
    }
    private set comment(value: string) {
        this._comment = value;
    }
    private _finalPrice!: number;
    public get finalPrice(): number {
        return this._finalPrice;
    }
    private set finalPrice(value: number) {
        this._finalPrice = value;
    }

    private _store!: Store;
    public get store(): Store {
        return this._store;
    }
    private set store(value: Store) {
        this._store = value;
    }

    constructor(params: {
        id?: string;
        customer: OrderCustomer;
        items: OrderItem[];
        date: Date;
        comment: string;
        finalPrice: number;
        store: Store;
    }) {
        this.id = params.id;
        this.customer = params.customer;
        this.items = params.items;
        this.date = params.date;
        this.comment = params.comment;
        this.finalPrice = params.finalPrice;
        this.store = params.store;
    }

    setCustomerId(id: string) {
        this.customer.id = id;
    }
}
