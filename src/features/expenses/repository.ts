// Repository in-memory dengan isolasi tenant. Mensimulasikan database untuk
// pembelajaran: setiap operasi WAJIB menerima tenantId dan hanya menyentuh data
// milik tenant tersebut. Di production, layer ini diganti query DB nyata yang
// tetap memfilter berdasarkan tenant/owner.
import { SEED_EXPENSES } from './seed';
import type {
CategoryTotal,
Expense,
ExpenseCategory,
ExpensePage,
ExpenseQuery,
ExpenseSummary,
} from './types';
// Store disimpan di globalThis, bukan di variabel modul biasa.
// Next.js membundel Route Handler dan halaman secara terpisah. Variabel `let store`
// di level modul akan punya salinan berbeda di tiap bundle, sehingga data yang
// dibuat lewat /api/expenses tidak terlihat di halaman /expenses. globalThis
// dibagi oleh semua bundle dalam satu proses server (pola yang sama dipakai
// untuk singleton Prisma client). Data tetap hilang saat server restart.
const globalStore = globalThis as unknown as { __expenseStore?: Expense[] };

function getStore(): Expense[] {
    globalStore.__expenseStore ??= SEED_EXPENSES.map((e) => ({ ...e }));
    return globalStore.__expenseStore;
}

function setStore(next: Expense[]): void {
    globalStore.__expenseStore = next;
}

function byTenant(tenantId: string): Expense[] {
    return getStore().filter((e) => e.tenantId === tenantId);
}
export function listExpenses(tenantId: string, query: ExpenseQuery = {}): ExpensePage {
    const { search = '', category = 'Semua', page = 1, pageSize = 5 } = query;
    let rows = byTenant(tenantId);
    if (category && category !== 'Semua') {
        rows = rows.filter((e) => e.category === category);
    }
    if (search.trim()) {
        const q = search.trim().toLowerCase();
        rows = rows.filter(
            (e) => e.title.toLowerCase().includes(q) || (e.notes ?? '').toLowerCase().includes(q),
        );
    }

    // Terbaru di atas: urut tanggal, lalu waktu dibuat untuk tanggal yang sama.
    rows = [...rows].sort(
        (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
    );

    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);
        return { items, total, page: safePage, pageSize, totalPages };
}

export function getExpense(tenantId: string, id: string): Expense | null {
    return byTenant(tenantId).find((e) => e.id === id) ?? null;
}

export function createExpense(tenantId: string, input: Omit<Expense, 'id' | 'tenantId' | 'createdAt' | 'status'>): Expense {
    const expense: Expense = { 
        ...input,
        id: `exp-${Date.now()}`,
        tenantId,
        status: 'completed',
        createdAt: new Date().toISOString(),
    };
    setStore([expense, ...getStore()]);
    return expense;
}

export function updateExpense(
        tenantId: string,
        id: string,
        patch: Partial<Omit<Expense, 'id' | 'tenantId' | 'createdAt'>>,
    ): Expense | null {
        const current = getExpense(tenantId, id);
        if (!current) return null;
        const updated = { ...current, ...patch };
        setStore(getStore().map((e) => (e.id === id && e.tenantId === tenantId ? updated : e)));
    return updated;
}

export function deleteExpense(tenantId: string, id: string): boolean {
    const before = getStore().length;
    setStore(getStore().filter((e) => !(e.id === id && e.tenantId === tenantId)));
    return getStore().length < before;
}

export function getSummary(tenantId: string): ExpenseSummary {
    const rows = byTenant(tenantId);
    const budgetMonth = 6_000_000;
    const totalMonth = rows.reduce((sum, e) => sum + e.amount, 0);
    const totals = new Map<ExpenseCategory, number>();
    for (const e of rows) {
        totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount);
    }
    const byCategory: CategoryTotal[] = [...totals]
        .map(([category, total]) => ({
            category,
            total,
            percentage: totalMonth > 0 ? Math.round((total / totalMonth) * 100) : 0,
        }))
        .sort((a, b) => b.total - a.total);
        return {
            totalMonth,
            budgetMonth,
            remainingBudget: budgetMonth - totalMonth,
            transactionCount: rows.length,
            largestCategory: byCategory[0] ?? { category: 'Lainnya', total: 0, percentage: 0},
            byCategory,
        };
}

// Dipakai test untuk mengembalikan store ke kondisi awal.
export function __resetStore(): void {
setStore(SEED_EXPENSES.map((e) => ({ ...e })));
}