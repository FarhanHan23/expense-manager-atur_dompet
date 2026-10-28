import type { Expense, ExpenseStatus } from './types';
import type { ExpenseFormData } from './schema';
// Error yang membawa status HTTP, supaya UI bisa membedakan 400, 401, dan 500.
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
// Satu pintu untuk semua request ke Route Handler milik aplikasi ini.
// Path relatif (/api/...) otomatis membawa cookie session karena same-origin.
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(path, {
        ...init,
        headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
    if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new ApiError(response.status, body?.error ?? `Request gagal (${response.status})`);
    }
    return (await response.json()) as T;
}
export function createExpenseApi(data: ExpenseFormData) {
    return apiFetch<{ data: Expense }>('/api/expenses', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
export type UpdateExpenseData = Partial<ExpenseFormData> & {
    status?: ExpenseStatus
};
export function updateExpenseApi(id: string, data: UpdateExpenseData) {
    return apiFetch<{ data: Expense }>(`/ api / expenses / ${encodeURIComponent(id)} `, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}