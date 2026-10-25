'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession } from '@/lib/auth';

// Validasi input login. Password cukup divalidasi panjang minimal; tidak dicocokkan
// ke credential apa pun karena ini session simulasi untuk belajar.
const loginSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});

export type LoginState = {
    error?: string;
    fieldErrors?: { email?: string; password?: string };
};

// formData ini ternyata terhubung ke page.tsx UI nya di loginAction nya
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
    const parsed = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if (!parsed.success) {
        const fieldErrors: LoginState['fieldErrors'] = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0] as 'email' | 'password';
            fieldErrors[key] = issue.message;
        }
    return { error: 'Periksa kembali data login.', fieldErrors };
    }
    await createSession(parsed.data.email);
    redirect('/dashboard');
}