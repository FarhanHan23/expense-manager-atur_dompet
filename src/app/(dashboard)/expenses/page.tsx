
import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Search, Filter } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { listExpenses } from '@/features/expenses/repository';
import { expenseCategories } from '@/features/expenses/schema';
import { ExpenseListView } from '@/components/expenses/ExpenseLiveView';

interface ExpensesPageProps {
    searchParams: Promise<{
        q?: string;
        category?: string;
        page?: string;
    }>;
}
// searchParams di Next.js 16 adalah Promise, jadi di-await dulu.
export default async function ExpensesPage({ searchParams }: ExpensesPageProps) {
    const { q = '', category = 'Semua', page = '1' } = await searchParams;
    const session = await getSession();
    if (!session?.tenantId) {
        redirect('/login');
    }
    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const result = listExpenses(session.tenantId, {
        search: q,
        category: category,
        page: currentPage,
        pageSize: 5,
    });
    const categories = ['Semua', ...expenseCategories];
    function getPaginationHref(newPage: number) {
        const sp = new URLSearchParams();
        if (q) sp.set('q', q);
        if (category && category !== 'Semua') sp.set('category', category);
        if (newPage > 1) sp.set('page', String(newPage));
        const qs = sp.toString();
        return qs ? `/expenses?${qs}` : '/expenses';
    }
    function getCategoryHref(cat: string) {
        const sp = new URLSearchParams();
        if (q) sp.set('q', q);
        if (cat && cat !== 'Semua') sp.set('category', cat);
        const qs = sp.toString();
        return qs ? `/expenses?${qs}` : '/expenses';
    }
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            {/* Header bar earthy */}
            <div className="flex flex-col gap-4 border-b border-[#d7d0c3] bg-[#20332f] p-6 text-[#f4f0e8] sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2b66d]">
                        Catatan Kas / Riwayat
                    </span>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                        Daftar Pengeluaran
                    </h1>
                    <p className="mt-1 text-xs text-[#c7d4cd]">
                        Kelola, telusuri, dan periksa riwayat pengeluaran yang tercatat di pembuk
                        uan Anda.
                    </p>
                </div>
                <Link
                    href="/expenses/new"
                    className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-[#f2b66d] px-4 py-2.5 text-xs font-bold text-[#20332f] transition-colors hover:bg-[#ffd08f] sm:self-auto"
                >
                    <Plus className="h-4 w-4" />
                    <span>Catat transaksi</span>
                </Link>
            </div>
            {/* Filter / Search Controls via GET Form & Category Links */}
            <div className="space-y-3">
                <form method="get" action="/expenses" className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68736d]" />
                        <input
                            type="text"
                            name="q"
                            defaultValue={q}
                            placeholder="Cari transaksi atau catatan..."
                            className="w-full rounded-md border border-[#d7d0c3] bg-white py-2 pl-10 pr-4 text-sm text-[#20332f] placeholder-[#68736d] transition-colors focus:border-[#20332f] focus:outline-none focus:ring-1 focus:ring-[#20332f]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            name="category"
                            defaultValue={category}
                            className="rounded-md border border-[#d7d0c3] bg-white px-3 py-2 text-sm text-[#20332f] transition-colors focus:border-[#20332f] focus:outline-none focus:ring-1 focus:ring-[#20332f]"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === 'Semua' ? 'Semua Kategori' : cat}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-md bg-[#20332f] px-4 py-2 text-sm font-semibold text-[#f4f0e8] transition-colors hover:bg-[#2a413b]"
                        >
                            <Filter className="h-3.5 w-3.5" />
                            <span>Filter</span>
                        </button>
                        {(q || (category && category !== 'Semua')) && (
                            <Link
                                href="/expenses"
                                className="rounded-md border border-[#d7d0c3] bg-[#fbf8f2] px-3 py-2 text-sm font-medium text-[#68736d] transition-colors hover:text-[#20332f]"
                            >
                                Reset
                            </Link>
                        )}
                    </div>
                </form>
                {/* Category Pills/Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    <span className="mr-1 hidden font-mono text-[11px] uppercase tracking-wider text-[#68736d] sm:inline">
                        Kategori:
                    </span>
                    {categories.map((cat) => {
                        const isSelected = category === cat || (!category && cat === 'Semua');
                        return (
                            <Link
                                key={cat}
                                href={getCategoryHref(cat)}
                                className={`whitespace-nowrap rounded-md px-3 py-1 font-medium transition-colors ${isSelected
                                    ? 'bg-[#20332f] text-[#f4f0e8]'
                                    : 'border border-[#d7d0c3] bg-[#fbf8f2] text-[#20332f] hover:bg-[#f4f0e8]'
                                    }`}
                            >
                                {cat}
                            </Link>
                        );
                    })}
                </div>
            </div>
            {/* Server Rendered Expense List */}
            <ExpenseListView items={result.items} />
            {/* Pagination Controls */}
            <div className="flex flex-col gap-3 border-t border-[#d7d0c3] pt-4 text-xs text-[#68736d] sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span>
                        Halaman <strong className="font-semibold text-[#20332f]">{result.page}</strong> dari{' '}
                        <strong className="font-semibold text-[#20332f]">{result.totalPages}</strong>{' '}
                        (Total {result.total} transaksi)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {result.page > 1 ? (
                        <Link
                            href={getPaginationHref(result.page - 1)}
                            className="rounded-md border border-[#d7d0c3] bg-[#fbf8f2] px-3 py-1.5 font-medium text-[#20332f] transition-colors hover:bg-[#f4f0e8]"
                        >
                            Sebelumnya
                        </Link>
                    ) : (
                        <span className="cursor-not-allowed rounded-md border border-[#e4ddd1] bg-[#f4f0e8] px-3 py-1.5 font-medium text-[#a0a8a3]">
                            Sebelumnya
                        </span>
                    )}
                    {result.page < result.totalPages ? (
                        <Link
                            href={getPaginationHref(result.page + 1)}
                            className="rounded-md border border-[#d7d0c3] bg-[#fbf8f2] px-3 py-1.5 font-medium text-[#20332f] transition-colors hover:bg-[#f4f0e8]"
                        >
                            Berikutnya
                        </Link>
                    ) : (
                        <span className="cursor-not-allowed rounded-md border border-[#e4ddd1] bg-[#f4f0e8] px-3 py-1.5 font-medium text-[#a0a8a3]">
                            Berikutnya
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
