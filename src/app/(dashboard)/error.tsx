'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
// error.tsx menangkap error rendering di segment (dashboard). Layout di atasnya
// (sidebar, header) tetap tampil, sehingga pengguna tidak kehilangan navigasi.
export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Captured in Next.js App Router error boundary:', error);
    }, [error]);
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-6">
            <div className="w-full max-w-md rounded-md border border-[#d7d0c3] bg-[#fbf8f2]
p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md
border border-[#e9c3b6] bg-[#fbeee9] text-[#d96d4f]">
                    <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-[#20332f]">Terjadi Kesalahan Aplik
                    asi</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#68736d]">
                    Halaman ini ditangkap oleh error boundary App Router (<code>error.tsx</code
                    >).
                    Kegagalan diisolasi di segment ini, jadi navigasi tetap bisa dipakai.
                </p>
                {error.message && (
                    <div className="mt-4 overflow-hidden rounded-md border border-[#e4ddd1] bg-
[#f4f0e8] p-3 text-left font-mono text-[11px] text-[#20332f]">
                        <span className="font-bold text-[#d96d4f]">Error: </span>
                        {error.message}
                    </div>
                )}
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#
20332f] px-4 py-2.5 text-xs font-semibold text-[#f4f0e8] transition-colors hover:bg-
[#2d4941]"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Coba Lagi (Reset)
                    </button>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d7d0c3] px-4 py-2.5 text-xs font-semibold text-[#20332f] transition-colorshover:bg-[#eae4d9]"
                    >
                        <Home className="h-4 w-4" />
                        Ke Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
