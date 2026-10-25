import { logoutAction } from '@/app/(auth)/logout/actions';

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f0e8] px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-[#d7d0c3] bg-[#fbf8f2] p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-[#20332f] text-lg font-bold text-[#f2b66d]">
          EM
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#20332f]">Dashboard</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#68736d]">
          Login berhasil. Halaman dashboard masih placeholder dan bisa diganti
          dengan konten utama aplikasi.
        </p>
        <form action={logoutAction} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md bg-[#20332f] px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#f4f0e8] transition-colors hover:bg-[#2a413b]"
          >
            Keluar
          </button>
        </form>
      </div>
    </main>
  );
}
