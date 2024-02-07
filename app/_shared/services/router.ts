export function globalRedirection(hostname: string, pathname: string) {
    window.location.href = `${hostname}${pathname}`;
}

export function createStoreRoute(storeSlug?: string) {
    if (!storeSlug) {
        return "/boutique";
    }
    return `/boutique/${storeSlug}`;
}

export function createProductRoute(params: {
    storeSlug?: string;
    productSlug: string;
}) {
    const { storeSlug, productSlug } = params;
    if (!storeSlug) {
        return `/produit/${productSlug}`;
    }
    return `/produit/${storeSlug}+${productSlug}`;
}

export function createCheckoutRoute(storeSlug?: string) {
    if (!storeSlug) {
        return "/caisse";
    }
    return `/caisse/${storeSlug}`;
}

export function createSuccessRoute(storeSlug?: string) {
    if (!storeSlug) {
        return "/success";
    }
    return `/success/${storeSlug}`;
}
