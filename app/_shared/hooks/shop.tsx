import { Product } from "@/business/models/product";
import { Store } from "@/business/models/store";
import { faker } from "@faker-js/faker";

export function useShop() {
    const getStore = async (slug: string) => {
        return new Store({
            name: faker.company.name(),
            id: faker.datatype.uuid(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            description: faker.company.catchPhrase(),
            logo: "",
            phone: faker.phone.number(),
        });
    };

    const getProducts = async (slug: string) => {
        let products: Product[] = [];

        for (let i = 0; i < 10; i++) {
            products.push(
                new Product({
                    id: faker.datatype.uuid(),
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.number.int({ min: 10, max: 100 }),
                    currency: faker.finance.currencyCode(),
                    images: [faker.image.url()],
                    nbSold: faker.number.int({ min: 0, max: 100 }),
                    quantity: faker.number.int({ min: 0, max: 100 }),
                })
            );
        }
        return products;
    };

    return {
        getStore,
        getProducts,
    };
}
