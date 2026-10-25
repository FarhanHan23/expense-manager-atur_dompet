import { redirect } from 'next/navigation';
// Keputusan login/tidak login ditangani di src/proxy.ts. Halaman ini hanya
// fallback statis agar build tidak membaca cookies() saat prerender.
export default function RootPage() {
  redirect('/login');
}