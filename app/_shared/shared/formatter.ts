export function formatPrice(price: number) {
    const numberString = price.toString();
    if (numberString.length <= 3) {
        return numberString; // No need to format if less than or equal to 3 digits
    }

    let formattedString = "";
    for (let i = numberString.length - 1; i >= 0; i -= 3) {
        formattedString =
            numberString[i] + (formattedString ? ` ${formattedString}` : "");
    }

    return formattedString;
}
