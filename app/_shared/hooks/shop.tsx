export function useShop() {
    const getInfo = async (slug: string) => {
        return {
            name: "wales",
        };
    };

    const getProducts = async (slug: string) => {
        return [];
    };

    return {
        getInfo,
        getProducts,
    };
}
