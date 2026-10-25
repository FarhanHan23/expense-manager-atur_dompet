'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Receipt,
    PlusCircle,
    FolderX,
    AlertTriangle,
    ShieldCheck,
} from 'lucide-react';
interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
}
const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Daftar Pengeluaran',
        href: '/expenses',
        icon: Receipt,
    },
    {
        label: 'Catat Pengeluaran',
        href: '/expenses/new',
        icon: PlusCircle,
    },
    {
        label: 'Simulasi Empty State',
        href: '/expenses/empty-state',
        icon: FolderX,
        badge: 'Demo',
    },
    {
        label: 'Simulasi Error State',
        href: '/expenses/error-demo',
        icon: AlertTriangle,
        badge: 'Demo',
    },
];
export function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden w-64 flex-col bg-[#20332f] p-5 text-[#f4f0e8] lg:flex">
            <div className="flex items-center gap-3 border-b border-[#2d4941] px-2 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f2
b66d] font-mono text-lg font-bold text-[#20332f]">
                    EM
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight">Expense Manager</h1>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#b8c8
c0]">ledger / 2026</p>
                </div>
            </div>
            <div className="mt-7 flex-1 space-y-1">
                <div className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] t
ext-[#91aaa0]">
                    Ruang kerja
                </div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Detail dan edit transaksi tetap menyorot menu Daftar Pengeluaran.
                    const isActive =
                        pathname === item.href ||
                        (item.href === '/expenses' &&
                            /^\/expenses\/(?!new$|empty-state$|error-demo$)/.test(pathname));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center justify-between border-l-2 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive ? 'border-[#f2b66d] bg-[#2f4942] text-[#f2b66d]' : 'border-transparent text-[#b8c8c0] hover:border-[#91aaa0] hover:bg-[#2a413b] hover:text-[#f4f0e8]'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    className={`h-4 w-4 transition-colors ${isActive
                                            ? 'text-[#f2b66d]'
                                            : 'text-[#91aaa0] group-hover:text-[#f4f0e8]'
                                        }`}
                                />
                                <span>{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="rounded-md bg-[#2a413b] px-1.5 py-0.5 text-[10px] font-medium text-[#f2b66d]">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
            <div className="border-t border-[#2d4941] pt-4">
                <div className="border border-[#2d4941] bg-[#2a413b] p-3.5 rounded-md">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#f4f0e
8]">
                        <ShieldCheck className="h-4 w-4 text-[#f2b66d]" />
                        <span>Lingkungan belajar</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#b8c8c0]">
                        Data demo lokal. Tidak ada credential nyata.
                    </p>
                </div>
            </div>
        </aside >
    );
}