export function getCurrencyLabel(currency: string) {
    switch (currency) {
        case "EUR":
            return "€";
        case "USD":
            return "$";
        case "FCFA":
            return "F";
        default:
            return currency;
    }
}
