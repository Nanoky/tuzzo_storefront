export class Entity {
    private _id!: string;
    public get id(): string {
        return this._id;
    }
    private set id(value: string) {
        this._id = value;
    }

    constructor(param: { id: string }) {
        this.id = param.id;
    }
}
