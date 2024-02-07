

export function globalRedirection(hostname: string, pathname: string) {
    window.location.href = `${hostname}${pathname}`;
}

export function createStoreRoute(storeSlug: string) {
    return `/boutique/${storeSlug}`;
}

export function createProductRoute(storeSlug: string, productSlug: string) {
    return `/produit/${storeSlug}+${productSlug}`;
}

export function createCheckoutRoute(storeSlug: string) {
    return `/caisse/${storeSlug}`;
}

export function createSuccessRoute(storeSlug: string) {
    return `/success/${storeSlug}`;
}