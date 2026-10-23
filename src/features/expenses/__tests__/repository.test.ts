import { describe, it, expect, beforeEach } from 'vitest';
import {
listExpenses,
getSummary,
createExpense,
getExpense,
__resetStore,
} from '../repository';
describe('Expense Repository', () => {
const tenantId = 'tenant-demo';
beforeEach(() => {
__resetStore();
});
describe('listExpenses', () => {
it('filters expenses by category', () => {
const result = listExpenses(tenantId, { category: 'Makanan' });
expect(result.items.length).toBeGreaterThan(0);
expect(result.items.every((item) => item.category === 'Makanan')).toBe(true);
expect(result.total).toBe(2);
});
it('returns all expenses when category is "Semua"', () => {
const result = listExpenses(tenantId, { category: 'Semua' });
expect(result.total).toBe(8);
});
it('searches by title or notes case-insensitively', () => {
const searchTitle = listExpenses(tenantId, { search: 'Engineering' });
expect(searchTitle.total).toBe(1);
expect(searchTitle.items[0].title).toContain('Engineering');
const searchNotes = listExpenses(tenantId, { search: 'Bandung' });
expect(searchNotes.total).toBe(1);
expect(searchNotes.items[0].notes).toContain('Bandung');
});
it('paginates expenses properly', () => {
const page1 = listExpenses(tenantId, { page: 1, pageSize: 3 });
expect(page1.page).toBe(1);
expect(page1.pageSize).toBe(3);
expect(page1.totalPages).toBe(3);
expect(page1.items.length).toBe(3);
expect(page1.total).toBe(8);
const page2 = listExpenses(tenantId, { page: 2, pageSize: 3 });
expect(page2.page).toBe(2);
expect(page2.items.length).toBe(3);
expect(page2.items[0].id).not.toBe(page1.items[0].id);
const page3 = listExpenses(tenantId, { page: 3, pageSize: 3 });
expect(page3.page).toBe(3);
expect(page3.items.length).toBe(2);
});
});
describe('getSummary', () => {
it('calculates total month and identifies largest category', () => {
    const summary = getSummary(tenantId);
expect(summary.totalMonth).toBe(3_220_000);
expect(summary.budgetMonth).toBe(6_000_000);
expect(summary.remainingBudget).toBe(2_780_000);
expect(summary.transactionCount).toBe(8);
expect(summary.largestCategory.category).toBe('Belanja');
expect(summary.largestCategory.total).toBe(1_250_000);
expect(summary.largestCategory.percentage).toBe(39);
// Breakdown dihitung dari data: terurut menurun dan totalnya sama.
expect(summary.byCategory[0]).toEqual(summary.largestCategory);
const totals = summary.byCategory.map((c) => c.total);
expect(totals).toEqual([...totals].sort((a, b) => b - a));
expect(totals.reduce((a, b) => a + b, 0)).toBe(summary.totalMonth);
});
});
describe('createExpense & tenant isolation', () => {
it('creates expense under specific tenant without leaking into other tenants', () => {
const otherTenant = 'tenant-other';
const newExpense = createExpense(otherTenant, {
title: 'Pengeluaran Tenant Lain',
amount: 250_000,
category: 'Hiburan',
paymentMethod: 'Cash',
date: '2026-10-17',
notes: 'Khusus tenant-other',
});
expect(newExpense.id).toBeDefined();
expect(newExpense.tenantId).toBe(otherTenant);
// Data tenant lain TIDAK muncul di tenant-demo
const demoList = listExpenses(tenantId);
expect(demoList.total).toBe(8);
expect(demoList.items.find((item) => item.id === newExpense.id)).toBeUndefined
();
expect(getExpense(tenantId, newExpense.id)).toBeNull();
// Data hanya muncul saat di-query dengan tenantId milik tenant-other
const otherList = listExpenses(otherTenant);
expect(otherList.total).toBe(1);
expect(otherList.items[0].id).toBe(newExpense.id);
expect(getExpense(otherTenant, newExpense.id)).not.toBeNull();
});
});
});