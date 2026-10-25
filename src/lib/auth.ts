// Session simulasi untuk pembelajaran.
// Tidak ada backend nyata, tidak menyimpan credential. Hanya menandai "sudah login"
// lewat cookie httpOnly supaya alur route protection bisa dipelajari dengan aman.
//
// PENTING (untuk student): di aplikasi production, verifikasi password dilakukan di
// server terhadap hash (mis. argon2/bcrypt) dan session disimpan sebagai token
// bertanda-tangan. Di sini kita hanya mensimulasikan hasil akhirnya.

import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './session';
export { SESSION_COOKIE };
export type SessionUser = {
    email: string;
    name: string;
    // Tenant dipakai bab Multi-Tenant untuk membatasi data per pemilik.
    tenantId: string;
};
// Satu "akun demo" yang sudah dikenal aplikasi. Email apa pun diterima pada simulasi,
// tetapi kita petakan ke satu tenant demo agar data tetap konsisten.
const DEMO_USER: SessionUser = {
    email: 'demo@gmail.com',
    name: 'Pengguna Demo',
    tenantId: 'tenant-demo',
};

export async function createSession(email: string): Promise<void> {
    const store = await cookies();
    const user: SessionUser = { ...DEMO_USER, email: email || DEMO_USER.email };
    store.set(SESSION_COOKIE, JSON.stringify(user), {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 8, // 8 jam
    });
}

export async function destroySession(): Promise<void> {
    const store = await cookies();
    store.delete(SESSION_COOKIE);
}
export async function getSession(): Promise<SessionUser | null> {
    const store = await cookies();
    const raw = store.get(SESSION_COOKIE)?.value;
    if (!raw) return null;
    try {
        return JSON.parse(raw) as SessionUser;
    } catch {
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    return (await getSession()) !== null;
}