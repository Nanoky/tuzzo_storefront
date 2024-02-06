import { CartBusiness } from "./business/logic/cart";
import { OrderBusiness } from "./business/logic/order";
import { ProductBusiness } from "./business/logic/product";
import { StoreBusiness } from "./business/logic/store";
import { VisitBusiness } from "./business/logic/visit";
import { CartRepository } from "./infrastructure/repository/cart";
import {
    OrderCustomerRepository,
    OrderItemRepository,
    OrderRepository,
} from "./infrastructure/repository/order";
import { ProductRepository } from "./infrastructure/repository/product";
import { StoreRepository } from "./infrastructure/repository/store";
import {
    VisitRepository,
    VisitStorage,
} from "./infrastructure/repository/visit";
import { FireStoreService, Firebase } from "./infrastructure/services/firebase";
import { SessionStorage } from "./infrastructure/services/storage";

export enum InstanceType {
    cart,
    store,
    product,
}

export class Instances {
    static instance: Instances;
    private cart!: CartBusiness | undefined;

    private apiService!: FireStoreService;

    private store!: StoreBusiness;
    private product!: ProductBusiness;
    private visit!: VisitBusiness;
    private order!: OrderBusiness;
    private constructor() {
        const sessionStorage = new SessionStorage();

        const cartRepository = new CartRepository();
        this.cart = new CartBusiness(cartRepository);

        const app = new Firebase();
        this.apiService = new FireStoreService(app);
        const storeRepository = new StoreRepository(this.apiService);
        this.store = new StoreBusiness(storeRepository);

        const productRepository = new ProductRepository(this.apiService);
        this.product = new ProductBusiness(productRepository);

        const visitRepository = new VisitRepository(this.apiService);
        const visitStorage = new VisitStorage(sessionStorage);
        this.visit = new VisitBusiness(visitStorage, visitRepository);

        const orderCustomerRepo = new OrderCustomerRepository(this.apiService);
        const orderItemRepo = new OrderItemRepository(this.apiService);
        const orderRepo = new OrderRepository(this.apiService);
        this.order = new OrderBusiness(
            orderRepo,
            orderCustomerRepo,
            orderItemRepo
        );
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

    static getVisitInstance() {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        return Instances.instance.visit;
    }

    static getOrderInstance() {
        if (!Instances.instance) {
            Instances.instance = new Instances();
        }

        return Instances.instance.order;
    }
}
