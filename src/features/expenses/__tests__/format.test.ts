import { describe, it, expect } from 'vitest';
import { formatIDR, formatDateIndo } from '../format';

describe('Expense Formatter Utilities', () => {
describe('formatIDR', () => {
    it('formats amount to Rupiah with thousand separators and 0 fraction digits', () => {

const formatted50k = formatIDR(50000);
expect(formatted50k).toMatch(/Rp/);
expect(formatted50k).toContain('50.000');
expect(formatted50k).not.toContain(',00');
const formattedMillion = formatIDR(1250000);
expect(formattedMillion).toContain('1.250.000');
});
it('formats zero correctly', () => {
const formattedZero = formatIDR(0);
expect(formattedZero).toMatch(/Rp/);
expect(formattedZero).toContain('0');
});
});
describe('formatDateIndo', () => {
it('formats ISO date string into Indonesian readable format', () => {
const formatted = formatDateIndo('2026-10-15');
expect(formatted).toContain('15');
expect(formatted).toContain('2026');
});
it('returns raw string when date is invalid', () => {
const invalid = 'tanggal-salah';
expect(formatDateIndo(invalid)).toBe(invalid);
});
});
});