import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Header } from '@/components/layout/Header';
import { getSession } from '@/lib/auth';
import Providers from '@/providers';
// Route ini membaca session (cookies) di server dan tidak bisa di-prerender
// sebagai static shell. Opt-out dari static shell validation agar build tidak gagal.
export const instant = false;
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Proxy sudah menolak request tanpa session; nilai cadangan hanya pengaman.
    const session = await getSession();
    const userName = session?.name ?? 'Pengguna';
    const userEmail = session?.email ?? '';
    return (
        <Providers>
            <div className="flex min-h-screen bg-[#f4f0e8] text-[#20332f]">
                {/* Desktop Sidebar */}
                <Sidebar />
                {/* Main Content Area */}
                <div className="flex flex-1 flex-col pb-20 lg:pb-0">
                    {/* Mobile Header and Drawer + Bottom Navigation */}
                    <MobileNav />
                    {/* Desktop Header */}
                    <Header userName={userName} userEmail={userEmail} />
                    {/* Page Inner Container */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </Providers>
    );
}