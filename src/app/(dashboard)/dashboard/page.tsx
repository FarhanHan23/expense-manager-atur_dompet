import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
    CreditCard,
    TrendingDown,
    PiggyBank,
    PieChart,
    ArrowRight,
    Plus,
} from 'lucide-react';
// import { StatCard } from '@/components/dashboard/StatCard';
// import { ExpenseListView } from '@/components/expenses/ExpenseListView';
import { getSession } from '@/lib/auth';
import { getSummary, listExpenses } from '@/features/expenses/repository';
import { formatIDR } from '@/features/expenses/format';
import { ExpenseListView } from '@/components/expenses/ExpenseLiveView';
import { StatCard } from '@/app/dashboard/StatCard';
export const metadata: Metadata = {
    title: 'Dashboard Keuangan | Expense Manager',
    description: 'Ringkasan pengeluaran, alokasi anggaran, dan analisis keuangan real-time.',
};
// Warna bar mengikuti token design system; diulang bila kategori lebih dari empat.
const BAR_COLORS = ['bg-[#20332f]', 'bg-[#4f8069]', 'bg-[#f2b66d]', 'bg-[#d96d4f]'];
export default async function DashboardPage() {
    const session = await getSession();
    const tenantId = session?.tenantId ?? 'tenant-demo';
    const summary = getSummary(tenantId);
    const expensePage = listExpenses(tenantId, { pageSize: 5 });
    const recentExpenses = expensePage.items;
    const budgetUsedPercentage =
        summary.budgetMonth > 0
            ? Math.round((summary.totalMonth / summary.budgetMonth) * 100)
            : 0;
    const remainingPercentage = Math.max(0, 100 - budgetUsedPercentage);
    // Status anggaran dihitung dari data, bukan teks tetap.
    const budgetStatus =
        summary.remainingBudget < 0 ? 'Lewat batas' : remainingPercentage < 20 ? 'Menipis' : 'Aman';
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-5 border-b border-[#d7d0c3] bg-[#20332f] p-6 text-[#f4f0e8] sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2b66d]">Ringkasan / data demo</span>
                    <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                        Uang keluar, keputusan lebih jelas.
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#c7d4cd]">
                        Pengeluaran tercatat sudah memakai {budgetUsedPercentage}% dari alokasi.
                        Lihat pos terbesar sebelum menambah transaksi berikutnya.
                    </p>
                </div>
                <Link href="/expenses/new"
                    className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-[#f2b66d] px-4 py-2.5 text-xs font-bold text-[#20332f] transition-colors hover:bg-[#ffd08f] sm:self-auto"
                >
                    <Plus className="h-4 w-4" />
                    Catat transaksi
                </Link>
            </div>
            {/* Metric Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Pengeluaran"
                    value={formatIDR(summary.totalMonth)}
                    subtext={`${summary.transactionCount} transaksi tercatat`}
                    icon={TrendingDown}
                    iconColor="text-[#d96d4f]"
                />
                <StatCard
                    title="Alokasi Anggaran"
                    value={formatIDR(summary.budgetMonth)}
                    subtext="Batas pengeluaran bulanan"
                    icon={CreditCard}
                    iconColor="text-[#20332f]"
                />
                <StatCard
                    title="Sisa Saldo Anggaran"
                    value={formatIDR(summary.remainingBudget)}
                    subtext={`${remainingPercentage}% anggaran tersisa`}
                    icon={PiggyBank}
                    iconColor="text-[#4f8069]"
                    badge={budgetStatus}
                    badgePositive={budgetStatus === 'Aman'}
                />
                <StatCard
                    title="Kategori Terbesar"
                    value={summary.largestCategory.category}
                    subtext={`${formatIDR(summary.largestCategory.total)} dari total`}
                    icon={PieChart}
                    iconColor="text-[#f2b66d]"
                    badge={`${summary.largestCategory.percentage}%`}
                    badgePositive={false}
                />
            </div>
            {/* Category Breakdown & Progress */}
            <div className="border border-[#d7d0c3] bg-[#fbf8f2] p-6">
                <div className="flex items-end justify-between gap-4 border-b border-[#e4ddd1] pb-4">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#7c877e]">Breakdown</p>
                        <h3 className="mt-1 text-base font-bold text-[#20332f]">
                            Distribusi anggaran per kategori
                        </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#7c877e]">semua transaksi</span>
                </div>
                <div className="mt-6 space-y-4">
                    {summary.byCategory.length === 0 && (
                        <p className="text-xs text-[#68736d]">Belum ada transaksi untuk dihitung.
                        </p>
                    )}
                    {summary.byCategory.map((item, index) => (
                        <div key={item.category}>
                            <div className="flex justify-between text-xs font-medium text-[#20332f]">
                                <span>{item.category}</span>
                                <span className="font-mono font-semibold text-[#20332f]">
                                    {formatIDR(item.total)} ({item.percentage}%)
                                </span>
                            </div>
                            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-md bg-[#eae4d9]">
                                <div
                                    className={`h-full rounded-md ${BAR_COLORS[index % BAR_COLORS.length]}`}
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recent Expenses List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#20332f]">
                            Pengeluaran Terbaru
                        </h2>
                        <p className="text-xs text-[#68736d]">
                            5 transaksi terakhir yang tercatat di sistem
                        </p>
                    </div>
                    <Link
                        href="/expenses"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#20332f] hover:text-[#2d4941]"
                    >
                        <span>Lihat Semua ({expensePage.total})</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
                <ExpenseListView items={recentExpenses} />
            </div>
        </div>
    );
}