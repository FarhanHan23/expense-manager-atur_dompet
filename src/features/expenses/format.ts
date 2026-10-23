// Formatter terpusat. Semua komponen memakai helper ini, bukan menulis ulang
// Intl.NumberFormat di tiap tempat.
export function formatIDR(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
}).format(amount);
}
export function formatDateIndo(dateStr: string): string {
    const date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) return dateStr;
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
        }).format(date);
}