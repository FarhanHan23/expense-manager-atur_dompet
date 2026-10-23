// Tipe domain fitur expense. Dipakai lintas layer: UI, repository, API, test.
export type ExpenseCategory =
| 'Makanan'
| 'Transportasi'
| 'Tagihan'
| 'Belanja'
| 'Hiburan'
| 'Kesehatan'
| 'Pendidikan'
| 'Lainnya';

export type PaymentMethod = 'Cash' | 'Transfer Bank' | 'E-Wallet' | 'Kartu Debit';

export type ExpenseStatus = 'completed' | 'pending';

export interface Expense {
    id: string;
    // tenantId membatasi kepemilikan data (bab Multi-Tenant). Setiap query
    // selalu difilter berdasarkan tenant pemilik session.
    tenantId: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    status: ExpenseStatus;
    createdAt: string;
}
export interface CategoryTotal {
    category: ExpenseCategory;
    total: number;
    percentage: number;
}
export interface ExpenseSummary {
    totalMonth: number;
    budgetMonth: number;
    remainingBudget: number;
    transactionCount: number;
    largestCategory: CategoryTotal;
    // Semua kategori yang punya transaksi, terbesar lebih dulu.
    byCategory: CategoryTotal[];
}
// Query untuk list: filter kategori, pencarian teks, pagination.
export interface ExpenseQuery {
    search?: string;
    category?: string;
    page?: number;
    pageSize?: number;
}

export interface ExpensePage {
    items: Expense[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}