import { Product } from "@/business/models/product";
import { faker } from "@faker-js/faker";

export function useProducts() {
    const getProduct = async (slug: string) => {
        return new Product({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.number.int({ min: 10, max: 100 }),
            currency: faker.finance.currencyCode(),
            images: [faker.image.url()],
            nbSold: faker.number.int({ min: 0, max: 100 }),
            quantity: faker.number.int({ min: 0, max: 100 }),
        });
    };

    return {
        getProduct,
    };
}
