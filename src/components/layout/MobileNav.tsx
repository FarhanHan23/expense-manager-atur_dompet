'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Receipt,
    Plus,
    Menu,
    X,
    FolderX,
    AlertTriangle,
    Wallet,
} from 'lucide-react';
import { LogoutButton } from './LogoutButton';
export function MobileNav() {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            {/* Mobile Top Header */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between bor
der-b border-[#d7d0c3] bg-[#f4f0e8]/95 px-4 backdrop-blur-md lg:hidden">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#20
332f] text-[#f2b66d]">
                        <Wallet className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-[#20332f]">
                        Expense Manager
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href="/expenses/new"
                        className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#20332f] p
x-2.5 text-xs font-semibold text-[#f4f0e8] hover:bg-[#2d4941]"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Catat</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        aria-label="Buka menu navigasi"
                        className="flex h-8 w-8 items-center justify-center rounded-md border bor
der-[#d7d0c3] bg-[#fbf8f2] text-[#20332f] hover:bg-[#eae4d9]"
                    >
                        {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </header>
            {/* Mobile Drawer Menu (when hamburger clicked) */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 bg-[#20332f]/60 backdrop-blur-xs lg:hidden">
                    <div className="fixed inset-y-0 right-0 flex w-3/4 max-w-xs flex-col justif
y-between border-l border-[#d7d0c3] bg-[#fbf8f2] p-6 shadow-xl">
                        <div>
                            <div className="flex items-center justify-between border-b border-[#d7d
0c3] pb-4">
                                <span className="text-sm font-bold text-[#20332f]">
                                    Menu Utama
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setDrawerOpen(false)}
                                    className="rounded-md p-1 text-[#68736d] hover:bg-[#eae4d9]"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <nav className="mt-4 space-y-1.5">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm fon
t-medium text-[#20332f] hover:bg-[#eae4d9]"
                                >
                                    <LayoutDashboard className="h-4 w-4 text-[#20332f]" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/expenses"
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm fon
t-medium text-[#20332f] hover:bg-[#eae4d9]"
                                >
                                    <Receipt className="h-4 w-4 text-[#4f8069]" />
                                    Daftar Pengeluaran
                                </Link>
                                <Link
                                    href="/expenses/new"
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm fon
t-medium text-[#20332f] hover:bg-[#eae4d9]"
                                >
                                    <Plus className="h-4 w-4 text-[#f2b66d]" />
                                    Catat Pengeluaran
                                </Link>
                                <Link
                                    href="/expenses/empty-state"
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm fon
t-medium text-[#20332f] hover:bg-[#eae4d9]"
                                >
                                    <FolderX className="h-4 w-4 text-[#68736d]" />
                                    Demo Empty State
                                </Link>
                                <Link
                                    href="/expenses/error-demo"
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm fon
t-medium text-[#20332f] hover:bg-[#eae4d9]"
                                >
                                    <AlertTriangle className="h-4 w-4 text-[#d96d4f]" />
                                    Demo Error State
                                </Link>
                            </nav>
                        </div>
                        <div className="border-t border-[#d7d0c3] pt-4">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            )}
            {/* Mobile Bottom Fixed Navigation Bar */}
            <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-ar
ound border-t border-[#d7d0c3] bg-[#f4f0e8]/95 px-2 backdrop-blur-md lg:hidden">
                <Link
                    href="/dashboard"
                    className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-med
ium transition-colors ${pathname === '/dashboard'
                            ? 'text-[#20332f] font-bold'
                            : 'text-[#68736d] hover:text-[#20332f]'
                        }`}
                >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                </Link>
                <Link
                    href="/expenses"
                    className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${pathname === '/expenses'
                        ? 'text-[#20332f] font-bold'
                        : 'text-[#68736d] hover:text-[#20332f]'
                        }`}
                >
                    <Receipt className="h-5 w-5" />
                    <span>Transaksi</span>
                </Link>
                {/* Center Action Button */}
                <Link
                    href="/expenses/new"
                    aria-label="Catat pengeluaran baru"
                    className="relative -top-3 flex h-11 w-11 items-center justify-center round
ed-md bg-[#20332f] text-[#f2b66d] shadow-md transition-transform active:scale-95 hove
r:bg-[#2d4941]"
                >
                    <Plus className="h-5 w-5" />
                </Link>
                <Link
                    href="/expenses/empty-state"
                    className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${pathname === '/expenses/empty-state'
                        ? 'text-[#20332f] font-bold'
                        : 'text-[#68736d] hover:text-[#20332f]'
                        }`}
                >
                    <FolderX className="h-5 w-5" />
                    <span>Empty</span>
                </Link>
                <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medi
um text-[#68736d] transition-colors hover:text-[#20332f]"
                >
                    <Menu className="h-5 w-5" />
                    <span>Menu</span>
                </button>
            </nav>
        </>
    );
}