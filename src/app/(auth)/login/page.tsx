'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, type LoginState } from './actions';

const initialState: LoginState = {};

function SubmitButton() {
    const { pending } = useFormStatus();
        return (
            <button
                type="submit"
                disabled={pending}
                className="mt-2 w-full rounded-md bg-[#20332f] px-4 py-2.5 text-sm font-semibol
                d uppercase tracking-wide text-[#f4f0e8] transition-colors hover:bg-[#2a413b] disable
                d:opacity-50"
            >
            {pending ? 'Memproses...' : 'Masuk'}
            </button>
        );
}

export default function LoginPage() {
    const [state, formAction] = useActionState(loginAction, initialState);
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f4f0e8] px-4 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-[#20332f] text-lg font-bold text-[#f2b66d]">
                            EM
                        </div>
                        <h1 className="mt-4 text-xl font-bold text-[#20332f]">Expense Manager</h1>
                        <p className="mt-1 text-xs uppercase tracking-widest text-[#68736d]">
                            Masuk untuk melanjutkan
                        </p>
                    </div>
                <div className="rounded-lg border border-[#d7d0c3] bg-[#fbf8f2] p-6">
            <div className="mb-5 rounded-md border border-[#e0d3b8] bg-[#f7eede] px-3 py-2 text-xs leading-relaxed text-[#6a5a36]">
                Mode demo: masukkan email valid dan password minimal 6 karakter.
                Tidak ada credential nyata yang disimpan. Coba{' '}
                <span className="font-mono">demo@gmail.com</span>.
            </div>
<form action={formAction} className="space-y-4">
    <div>
        <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wide text-[#3f4d48]"
        >
            Email
        </label>
        <input
            id="email"
            name="email"
            type="email"
            defaultValue="demo@gmail.com"
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-[#cfc7b9] bg-white
            px-3 py-2 text-sm text-[#1d2a27] focus:border-[#20332f] focus:outline-none focus:ring-1 focus:ring-[#20332f]"
        />
            {state.fieldErrors?.email && (
                <p className="mt-1 text-xs text-[#d96d4f]">
                    {state.fieldErrors.email}
                </p>
            )}
    </div>
<div>
<label
htmlFor="password"
className="block text-xs font-semibold uppercase tracking-wide text-
[#3f4d48]"
>
Password
</label>
<input
id="password"
name="password"
type="password"
defaultValue="demodemo"
autoComplete="current-password"
className="mt-1.5 w-full rounded-md border border-[#cfc7b9] bg-white
px-3 py-2 text-sm text-[#1d2a27] focus:border-[#20332f] focus:outline-none focus:ring
-1 focus:ring-[#20332f]"
/>
{state.fieldErrors?.password && (
<p className="mt-1 text-xs text-[#d96d4f]">{state.fieldErrors.password}</p>
)}
</div>
{state.error && !state.fieldErrors && (
<p className="text-xs text-[#d96d4f]">{state.error}</p>
)}
<SubmitButton />
</form>
</div>
<p className="mt-6 text-center text-xs text-[#8a938c]">
Studi kasus e-book &middot; Koding Beruang
</p>
</div>
</div>
);
}