import { describe, it, expect } from 'vitest';
import { expenseSchema } from '../schema';
describe('Expense Validation Schema', () => {
const validPayload = {
title: 'Makan Siang Soto Betawi',
amount: 35000,
category: 'Makanan',
paymentMethod: 'Cash',
date: '2026-10-17',
notes: 'Makan siang enak',
};
it('validates correct expense input successfully', () => {
const result = expenseSchema.safeParse(validPayload);
expect(result.success).toBe(true);
if (result.success) {
expect(result.data.title).toBe(validPayload.title);
expect(result.data.amount).toBe(35000);
}
});
it('fails when title is shorter than 3 characters', () => {
const result = expenseSchema.safeParse({
...validPayload,
title: 'Ab',
});
expect(result.success).toBe(false);
if (!result.success) {
const error = result.error.issues.find((i) => i.path[0] === 'title');
expect(error).toBeDefined();
expect(error?.message).toContain('minimal 3 karakter');
}
});
it('fails when amount is 0 or negative', () => {
const resultZero = expenseSchema.safeParse({
...validPayload,
amount: 0,
});
expect(resultZero.success).toBe(false);
if (!resultZero.success) {
const error = resultZero.error.issues.find((i) => i.path[0] === 'amount');
expect(error).toBeDefined();
expect(error?.message).toContain('lebih besar dari 0');
}
const resultNegative = expenseSchema.safeParse({
...validPayload,
amount: -15000,
});
expect(resultNegative.success).toBe(false);
if (!resultNegative.success) {
const error = resultNegative.error.issues.find((i) => i.path[0] === 'amount');
expect(error).toBeDefined();
}
});
it('fails when category is invalid', () => {
const result = expenseSchema.safeParse({
    ...validPayload,
category: 'KategoriSembarang',
});
expect(result.success).toBe(false);
if (!result.success) {
const error = result.error.issues.find((i) => i.path[0] === 'category');
expect(error).toBeDefined();
}
});
});