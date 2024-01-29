import { CartAdapter } from "./app/_shared/adapters/cart";
import { CartBusiness } from "./business/logic/cart";
import { CartRepository } from "./infrastructure/adapters/cart";

export enum InstanceType {
    cart,
    store,
}

export class Instances {
    static instance: Instances;
    private _cart?: CartAdapter | undefined;
    private get cart(): CartAdapter | undefined {
        return this._cart;
    }
    private set cart(value: CartAdapter | undefined) {
        this._cart = value;
    }
    private constructor() {}
    static async loadApp() {
        return new Promise<void>((resolve, reject) => {
            if (Instances.getInstance(InstanceType.cart)) {
                resolve();
            } else {
                const cartRepository = new CartRepository();
                const business = new CartBusiness(cartRepository);
                business.init().then(() => {
                    Instances.setInstance(
                        InstanceType.cart,
                        new CartAdapter(business)
                    );
                    resolve();
                });
            }
        });
    }
    static getInstance(type: InstanceType) {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        switch (type) {
            case InstanceType.cart:
                return Instances.instance.cart;

            default:
                break;
        }
    }

    static setInstance(type: InstanceType, instance: any) {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        switch (type) {
            case InstanceType.cart:
                Instances.instance.cart = instance;

            default:
                break;
        }
    }
}
