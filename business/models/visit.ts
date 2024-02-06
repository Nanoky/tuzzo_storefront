export class Visit {
    private _date!: Date;
    public get date(): Date {
        return this._date;
    }
    private set date(value: Date) {
        this._date = value;
    }

    constructor(param: { date: Date }) {
        this.date = param.date;
    }
}
