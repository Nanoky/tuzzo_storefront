import { CartAdapter } from "./app/_shared/adapters/cart";
import { StoreAdapter } from "./app/_shared/adapters/store";
import { CartBusiness } from "./business/logic/cart";
import { StoreBusiness } from "./business/logic/store";
import { CartRepository } from "./infrastructure/repository/cart";
import { StoreRepository } from "./infrastructure/repository/store";
import { FireStoreService, Firebase } from "./infrastructure/services/firebase";

export enum InstanceType {
    cart,
    store,
    product,
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

    private apiService!: FireStoreService;

    private store!: StoreAdapter;
    private constructor() {
        const cartRepository = new CartRepository();
        const business = new CartBusiness(cartRepository);
        this.cart = new CartAdapter(business);

        const app = new Firebase();
        this.apiService = new FireStoreService(app);
        const storeRepositoru = new StoreRepository(this.apiService);
        const businessStore = new StoreBusiness(storeRepositoru);
        this.store = new StoreAdapter(businessStore);
    }
    static getInstance(type: InstanceType) {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        switch (type) {
            case InstanceType.cart:
                return Instances.instance.cart;

            case InstanceType.store:
                return Instances.instance.store;

            default:
                break;
        }
    }
}
