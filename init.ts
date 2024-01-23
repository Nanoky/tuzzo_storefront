import { CartAdapter } from "./app/_shared/adapters/cart";
import { CartBusiness } from "./business/logic/cart";
import { CartRepository } from "./infrastructure/adapters/cart";

export enum InstanceType {
    cart,
    store,
}

export class Instances {
    static instance: Instances;
    private cart: CartAdapter;
    private constructor() {
        const cartRepository = new CartRepository();
        const business = new CartBusiness(cartRepository);
        this.cart = new CartAdapter(business);
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
}
