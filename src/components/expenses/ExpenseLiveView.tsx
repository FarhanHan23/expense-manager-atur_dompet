import React from 'react';
import Link from 'next/link';
import { ArrowRight, Receipt, Calendar, Tag, CreditCard } from 'lucide-react';
import type { Expense } from '@/features/expenses/types';
import { formatIDR, formatDateIndo } from '@/features/expenses/format';
interface ExpenseListViewProps {
    items: Expense[];
}
export function ExpenseListView({ items }: ExpenseListViewProps) {
    if (items.length === 0) {
        return (
            <div className="rounded-md border border-dashed border-[#cfc7b9] bg-[#fbf8f2] p
-12 text-center">
                <Receipt className="mx-auto h-10 w-10 text-[#68736d]" />
                <h3 className="mt-3 text-base font-semibold text-[#20332f]">
                    Tidak ada transaksi ditemukan
                </h3>
                <p className="mt-1 text-xs text-[#68736d]">
                    Belum ada catatan transaksi yang sesuai dengan filter atau pencarian Anda.
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden overflow-hidden rounded-md border border-[#d7d0c3] bg-[#
fbf8f2] md:block">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#d7d0c3] bg-[#f4f0e8] text-xs font-semibo
ld uppercase tracking-wider text-[#68736d]">
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3">Judul &amp; Catatan</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">Metode</th>
                            <th className="px-4 py-3 text-right">Nominal</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4ddd1]">
                        {items.map((item) => (
                            <tr
                                key={item.id}
                                className="transition-colors hover:bg-[#f4f0e8]/60"
                            >
                                <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-
[#68736d]">
                                    {formatDateIndo(item.date)}
                                </td>
                                <td className="px-4 py-3.5">
                                    <Link
                                        href={`/expenses/${item.id}`}
                                        className="font-semibold text-[#20332f] hover:underline"
                                    >
                                        {item.title}
                                    </Link>
                                    {item.notes && (
                                        <p className="mt-0.5 max-w-xs truncate text-xs text-[#68736d]">
                                            {item.notes}
                                        </p>
                                    )}
                                </td>
                                <td className="px-4 py-3.5">
                                    <span className="inline-flex items-center rounded-md border border-
[#d7d0c3] bg-[#f4f0e8] px-2.5 py-0.5 text-xs font-medium text-[#20332f]">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 text-xs text-[#68736d]">
                                    {item.paymentMethod}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 text-right font-mono tex
t-sm font-bold text-[#20332f]">
                                    {formatIDR(item.amount)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 text-right">
                                    <Link
                                        href={`/expenses/${item.id}`}
                                        className="inline-flex items-center gap-1 rounded-md border borde
r-[#d7d0c3] bg-white px-2.5 py-1 text-xs font-medium text-[#20332f] transition-colors
hover:bg-[#f4f0e8]"
                                    >
                                        <span>Detail</span>
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile Cards View */}
            <div className="space-y-3 md:hidden">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-md border border-[#d7d0c3] bg-[#fbf8f2] p-4 space-y-2.
5"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <Link
                                    href={`/expenses/${item.id}`}
                                    className="font-semibold text-sm text-[#20332f] hover:underline"
                                >
                                    {item.title}
                                </Link>
                                {item.notes && (
                                    <p className="mt-0.5 text-xs text-[#68736d] line-clamp-2">
                                        {item.notes}
                                    </p>
                                )}
                            </div>
                            <span className="shrink-0 font-mono text-sm font-bold text-[#20332f]">
                                {formatIDR(item.amount)}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 border-t border-[#e4ddd
1] pt-2 text-xs text-[#68736d]">
                            <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDateIndo(item.date)}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                {item.category}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                                <CreditCard className="h-3 w-3" />
                                {item.paymentMethod}
                            </span>
                        </div>
                        <div className="pt-1 text-right">
                            <Link
                                href={`/expenses/${item.id}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-
[#20332f] hover:underline"
                            >
                                <span>Lihat Detail</span>
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}