import { Entity } from "../shared/entity";

export class Store extends Entity {
    private _name!: string;
    public get name(): string {
        return this._name;
    }
    private set name(value: string) {
        this._name = value;
    }
    private _address?: string | undefined;
    public get address(): string | undefined {
        return this._address;
    }
    private set address(value: string | undefined) {
        this._address = value;
    }
    private _city?: string | undefined;
    public get city(): string | undefined {
        return this._city;
    }
    private set city(value: string | undefined) {
        this._city = value;
    }
    private _description?: string | undefined;
    public get description(): string | undefined {
        return this._description;
    }
    private set description(value: string | undefined) {
        this._description = value;
    }
    private _logo?: string | undefined;
    public get logo(): string | undefined {
        return this._logo;
    }
    private set logo(value: string | undefined) {
        this._logo = value;
    }
    private _phone?: string | undefined;
    public get phone(): string | undefined {
        return this._phone;
    }
    private set phone(value: string | undefined) {
        this._phone = value;
    }

    constructor(param: {
        id: string;
        name: string;
        address?: string;
        city?: string;
        description?: string;
        logo?: string;
        phone?: string;
    }) {
        super({
            id: param.id,
        });
        this.name = param.name;
        this.address = param.address;
        this.city = param.city;
        this.description = param.description;
        this.logo = param.logo;
        this.phone = param.phone;
    }
}
