export class Visit {
    private _date!: Date;
    public get date(): Date {
        return this._date;
    }
    private set date(value: Date) {
        this._date = value;
    }

    private _productId?: string | undefined;
    public get productId(): string | undefined {
        return this._productId;
    }
    private set productId(value: string | undefined) {
        this._productId = value;
    }

    constructor(param: { date: Date; productId?: string }) {
        this.date = param.date;
        this.productId = param.productId;
    }
}
