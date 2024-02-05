import { CartAdapter } from "./app/_shared/adapters/cart";
import { ProductAdapter } from "./app/_shared/adapters/product";
import { StoreAdapter } from "./app/_shared/adapters/store";
import { CartBusiness } from "./business/logic/cart";
import { ProductBusiness } from "./business/logic/product";
import { StoreBusiness } from "./business/logic/store";
import { CartRepository } from "./infrastructure/repository/cart";
import { ProductRepository } from "./infrastructure/repository/product";
import { StoreRepository } from "./infrastructure/repository/store";
import { FireStoreService, Firebase } from "./infrastructure/services/firebase";

export enum InstanceType {
    cart,
    store,
    product,
}

export class Instances {
    static instance: Instances;
    private cart!: CartAdapter | undefined;

    private apiService!: FireStoreService;

    private store!: StoreAdapter;
    private product!: ProductAdapter;
    private constructor() {
        const cartRepository = new CartRepository();
        const business = new CartBusiness(cartRepository);
        this.cart = new CartAdapter(business);

        const app = new Firebase();
        this.apiService = new FireStoreService(app);
        const storeRepository = new StoreRepository(this.apiService);
        const businessStore = new StoreBusiness(storeRepository);
        this.store = new StoreAdapter(businessStore);

        const productRepository = new ProductRepository(this.apiService);
        const businessProduct = new ProductBusiness(productRepository);
        this.product = new ProductAdapter(businessProduct);
    }

    static getCartInstance() {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        return Instances.instance.cart;
    }

    static getStoreInstance() {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        return Instances.instance.store;
    }

    static getProductInstance() {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        return Instances.instance.product;
    }
}
