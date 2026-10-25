'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import { LogoutButton } from './LogoutButton';
// Judul header mengikuti halaman yang sedang dibuka.
function pageTitle(pathname: string): { title: string; description: string } {
    if (pathname === '/dashboard') {
        return {
            title: 'Ringkasan Keuangan', description: 'Pantau pengeluaran terhadap alokasi anggaran.'
        };
    }
    if (pathname === '/expenses/new') {
        return {
            title: 'Catat Pengeluaran', description: 'Tambah transaksi baru ke bukukas.'
        };
    }
    if (pathname === '/expenses/empty-state' || pathname === '/expenses/error-demo') {
        return {
            title: 'Simulasi State', description: 'Route demo untuk mengamati empty state dan error boundary.'
        };
    }
    if (pathname.endsWith('/edit')) {
        return {
            title: 'Ubah Pengeluaran', description: 'Perbarui data transaksi yang sudah tercatat.'
        };
    }
    if (pathname.startsWith('/expenses/')) {
        return { title: 'Detail Pengeluaran', description: 'Rincian satu transaksi.' };
    }
    return {
        title: 'Daftar Pengeluaran', description: 'Cari, saring, dan telusuri semua transaksi.'
    };
}
function initials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
}
export function Header({ userName, userEmail }: {
    userName: string; userEmail: string
}) {
    const pathname = usePathname();
    const { title, description } = pageTitle(pathname);
    return (
        <header className="hidden items-center justify-between border-b border-[#d7d0c3] bg-[#f4f0e8] px-8 py-4 lg:flex">
            <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#68736d]">
                    Ruang kerja keuangan
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-[#20332f]">{title}
                </h2>
                <p className="text-xs text-[#68736d]">{description}</p>
            </div>
            <div className="flex items-center gap-3"></div>
            <Link
                href="/expenses/new"
                className="inline-flex items-center gap-2 rounded-md bg-[#20332f] px-4 py-2 text-sm font-semibold text-[#f4f0e8] transition-colors hover:bg-[#2d4941]"
            >
                <Plus className="h-4 w-4" />
                <span>Catat transaksi</span>
            </Link>
            <div className="flex items-center gap-3 border-l border-[#d7d0c3] pl-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#d96d4f] font-mono text-xs font-bold text-[#f4f0e8]">
                    {initials(userName)}
                </div>
                <div className="text-left">
                    <div className="text-xs font-semibold text-[#20332f]">{userName}</div>
                    <div className="font-mono text-[10px] text-[#68736d]">{userEmail}</div>
                </div>
                <LogoutButton />
            </div>
        </header >
    );
}