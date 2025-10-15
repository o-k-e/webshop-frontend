export function formatPrice(value: number, locale: string = 'hu-HU') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}