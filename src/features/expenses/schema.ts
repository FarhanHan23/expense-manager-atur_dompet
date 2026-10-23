import { z } from 'zod';
export const expenseCategories = [
'Makanan',
'Transportasi',
'Tagihan',
'Belanja',
'Hiburan',
'Kesehatan',
'Pendidikan',
'Lainnya',
] as const;
export const paymentMethods = [
'Cash',
'Transfer Bank',
'E-Wallet',
'Kartu Debit',
] as const;
// Satu schema dipakai bersama oleh form (React Hook Form), Server Action, dan
// Route Handler. Validasi tidak diduplikasi.
export const expenseSchema = z.object({
title: z
.string()
.min(3, { message: 'Nama pengeluaran minimal 3 karakter' })
.max(100, { message: 'Nama pengeluaran maksimal 100 karakter' }),
amount: z
.number({ message: 'Nominal harus berupa angka valid' })
.positive({ message: 'Nominal harus lebih besar dari 0' }),
category: z.enum(expenseCategories, {
message: 'Pilih kategori pengeluaran yang valid',
}),
paymentMethod: z.enum(paymentMethods, {
message: 'Pilih metode pembayaran yang valid',
}),
date: z.string().min(1, { message: 'Tanggal transaksi wajib diisi' }),
notes: z
.string()
.max(250, { message: 'Catatan tambahan maksimal 250 karakter' })
.optional(),
});
export type ExpenseFormData = z.infer<typeof expenseSchema>;